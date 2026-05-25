from odoo import models, fields, api
from odoo.exceptions import ValidationError
from datetime import date


class HmsPatient(models.Model):
    _name = 'hms.patient'
    _description = 'Hospital Patient'

    first_name = fields.Char(required=True)
    last_name = fields.Char(required=True)
    birth_date = fields.Date()
    age = fields.Integer(compute='_compute_age', store=False)
    image = fields.Binary()
    address = fields.Text()
    email = fields.Char()
    blood_type = fields.Selection([
        ('A+', 'A+'), ('A-', 'A-'), ('B+', 'B+'), ('B-', 'B-'),
        ('AB+', 'AB+'), ('AB-', 'AB-'), ('O+', 'O+'), ('O-', 'O-'),
    ])
    cr_ratio = fields.Float()
    pcr = fields.Boolean()
    history = fields.Html()

    state = fields.Selection([
        ('undetermined', 'Undetermined'),
        ('good', 'Good'),
        ('fair', 'Fair'),
        ('serious', 'Serious'),
    ], default='undetermined')

    department_id = fields.Many2one('hms.department',
                                    domain=[('is_opened', '=', True)])
    department_capacity = fields.Integer(related='department_id.capacity',
                                         readonly=True)
    doctor_ids = fields.Many2many('hms.doctors')
    log_ids = fields.One2many('hms.patient.log', 'patient_id')

    ##### constraints ###############################
    _sql_constraints = [
        ('unique_patient_email', 'UNIQUE(email)', 'Email must be unique across all patients!'),
    ]

    @api.constrains('email')
    def _check_email(self):
        import re
        for rec in self:
            if rec.email and not re.match(r"[^@]+@[^@]+\.[^@]+", rec.email):
                raise ValidationError('Please enter a valid email address!')
    ##################################################
    @api.depends('birth_date')
    def _compute_age(self):
        for rec in self:
            if rec.birth_date:
                rec.age = (date.today() - rec.birth_date).days // 365
            else:
                rec.age = 0

    @api.onchange('birth_date')
    def _onchange_birth_date(self):
        if self.age and self.age < 30:
            self.pcr = True
            return {
                'warning': {
                    'title': 'PCR Checked',
                    'message': 'PCR has been automatically checked because age is under 30.',
                }
            }

    @api.onchange('state')
    def _onchange_state(self):
        if self.state:
            self.env['hms.patient.log'].create({
                'patient_id': self._origin.id,
                'description': f'State changed to {self.state}',
            })
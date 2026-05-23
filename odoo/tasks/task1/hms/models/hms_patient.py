from odoo import models, fields, api
from datetime import date

class HmsPatient(models.Model):
    _name = 'hms.patient'
    _description = 'Hospital Patient'

    first_name = fields.Char()
    last_name = fields.Char()
    birth_date = fields.Date()
    age = fields.Integer(compute='_compute_age', store=True)
    image = fields.Binary()
    address = fields.Text()
    blood_type = fields.Selection([
        ('A+', 'A+'), ('A-', 'A-'), ('B+', 'B+'), ('B-', 'B-'),
        ('AB+', 'AB+'), ('AB-', 'AB-'), ('O+', 'O+'), ('O-', 'O-'),
    ])
    cr_ratio = fields.Float()
    pcr = fields.Boolean()
    history = fields.Html()

    @api.depends('birth_date')
    def _compute_age(self):
        for rec in self:
            if rec.birth_date:
                rec.age = (date.today() - rec.birth_date).days // 365
            else:
                rec.age = 0
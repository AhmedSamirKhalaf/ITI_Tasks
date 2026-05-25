from odoo import models, fields, api
from odoo.exceptions import ValidationError, UserError


class ResPartner(models.Model):
    _inherit = 'res.partner'

    related_patient_id = fields.Many2one('hms.patient', string='Related Patient')

    @api.constrains('email', 'related_patient_id')
    def _check_patient_email(self):
        for rec in self:
            if rec.email:
                patient = self.env['hms.patient'].search([('email', '=', rec.email)], limit=1)
                if patient:
                    raise ValidationError("This email already belongs to a patient.")

    def unlink(self):
        for rec in self:
            if rec.related_patient_id:
                raise UserError("Cannot delete a customer linked to a patient.")
        return super(ResPartner, self).unlink()

    vat = fields.Char(required=True)

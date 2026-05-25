from odoo import models, fields


class HmsDoctors(models.Model):
    _name = 'hms.doctors'
    _description = 'Hospital Doctor'

    first_name = fields.Char()
    last_name = fields.Char()
    image = fields.Binary()
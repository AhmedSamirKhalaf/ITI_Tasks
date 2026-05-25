{
    'name': 'HMS',
    'depends': ['base', 'contacts', 'sale', 'purchase'],
    'application': True,
    'data': [
        'views/hms_department_views.xml',
        'views/hms_doctor_views.xml',
        'views/hms_patient_views.xml',
        'views/res_partner_views.xml',
        'views/hms_menus.xml',
    ],
}

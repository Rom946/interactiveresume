# Generated by Django 3.1.1 on 2020-09-18 01:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0002_emailssent_date_sent'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='EmailsSent',
            new_name='Emails',
        ),
    ]

# Generated by Django 3.1.7 on 2021-02-22 07:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diagram', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='link',
            name='arrorws',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]

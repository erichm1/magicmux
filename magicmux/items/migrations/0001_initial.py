# Generated by Django 5.2 on 2025-04-13 19:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('type', models.CharField(max_length=20)),
                ('description', models.TextField()),
                ('value', models.PositiveIntegerField(default=0)),
                ('stats', models.JSONField(default=dict)),
                ('image', models.ImageField(blank=True, null=True, upload_to='items/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]

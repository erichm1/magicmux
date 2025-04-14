# Generated by Django 5.2 on 2025-04-13 19:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('world', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Monster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('hp', models.IntegerField()),
                ('damage', models.IntegerField()),
                ('drop_table', models.JSONField(default=list)),
                ('spawn_rate', models.FloatField(default=1.0)),
                ('respawn_time', models.IntegerField(default=30)),
                ('level', models.IntegerField(default=1)),
                ('exp', models.IntegerField(default=0)),
                ('image', models.ImageField(blank=True, null=True, upload_to='monsters/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('zone', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='world.mapzone')),
            ],
        ),
    ]

# Generated by Django 3.0.5 on 2020-04-15 16:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('funnels', '0003_auto_20200415_1600'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='funnel',
            name='landingpage',
        ),
        migrations.RemoveField(
            model_name='funnel',
            name='optinpage',
        ),
        migrations.AddField(
            model_name='landingpage',
            name='funnel',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='landingpage', to='funnels.Funnel'),
        ),
        migrations.AddField(
            model_name='optinpage',
            name='funnel',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='optinpage', to='funnels.Funnel'),
        ),
        migrations.AlterField(
            model_name='landingpage',
            name='h1',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='optinpage',
            name='h1',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]

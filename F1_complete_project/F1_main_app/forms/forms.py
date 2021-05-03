from django import forms
from F1_main_app.models import Grand_Prix

class Grand_Prix_form(forms.ModelForm):
	class Meta:
		model = Grand_Prix
		fields = ['name', 'nationality', 'circuit_lenght', 'number_of_lap', 'distance', 'lap_record']
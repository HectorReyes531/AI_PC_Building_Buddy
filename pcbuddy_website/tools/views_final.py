# views.py

from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import Component, Build, Category
from .forms import UserLoginForm, UserRegistrationForm

def index(request):
    builds = Build.objects.all()
    return render(request, 'index.html', {'builds': builds})

def build_detail(request, build_id):
    build = get_object_or_404(Build, pk=build_id)
    return render(request, 'build_detail.html', {'build': build})

@login_required
def add_build(request):
    if request.method == 'POST':
        # Process form data and save new build
        selected_component_ids = request.POST.getlist('components')
        new_build = Build.objects.create(
            name=request.POST['name'],
            description=request.POST['description'],
            owner=request.user
        )
        new_build.components.add(*selected_component_ids)
        new_build.save()
        return redirect('index')
    else:
        components = Component.objects.all()
        return render(request, 'add_build.html', {'components': components})

def category_detail(request, category_id):
    category = get_object_or_404(Category, pk=category_id)
    components = Component.objects.filter(category=category)
    return render(request, 'category_detail.html', {'category': category, 'components': components})

def component_detail(request, component_id):
    component = get_object_or_404(Component, pk=component_id)
    return render(request, 'component_detail.html', {'component': component})

def user_login(request):
    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return redirect('index')
    else:
        form = UserLoginForm()
    return render(request, 'login.html', {'form': form})

@login_required
def user_logout(request):
    logout(request)
    return redirect('index')

def user_register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('index')
    else:
        form = UserRegistrationForm()
    return render(request, 'register.html', {'form': form})

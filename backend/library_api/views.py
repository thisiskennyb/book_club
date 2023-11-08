from rest_framework.views import APIView
import requests
from django.http import JsonResponse

class TitleView(APIView):
    def get(self, request):
        title = request.GET.get('title')
        result_page = request.GET.get('resultpage')
        api_url = f"https://openlibrary.org/search.json?title={title}&limit=10&sort=editions&language=eng&page={result_page}"

        try:
            # Send a GET request to the API
            response = requests.get(api_url)

            # Check if the request was successful
            if response.status_code == 200:
                # Parse the JSON response
                data = response.json()
                return JsonResponse(data)
            else:
                # Handle the case where the request was not successful
                return JsonResponse({'error': 'Failed to retrieve data from the Open Library API'}, status=500)

        except requests.RequestException as e:
            # Handle any request-related errors
            return JsonResponse({'error': f'Request error: {str(e)}'}, status=500)
class AuthorView(APIView):
    def get(self, request):
        author = request.GET.get('author')
        result_page = request.GET.get('resultpage')
        api_url = f"https://openlibrary.org/search.json?author={author}&limit=10&sort=editions&language=eng&page={result_page}"

        try:
            # Send a GET request to the API
            response = requests.get(api_url)

            # Check if the request was successful
            if response.status_code == 200:
                # Parse the JSON response
                data = response.json()
                return JsonResponse(data)
            else:
                # Handle the case where the request was not successful
                return JsonResponse({'error': 'Failed to retrieve data from the Open Library API'}, status=500)

        except requests.RequestException as e:
            # Handle any request-related errors
            return JsonResponse({'error': f'Request error: {str(e)}'}, status=500)
class SubjectView(APIView):
    def get(self, request):
        subject = request.GET.get('subject')
        result_page = request.GET.get('resultpage')
        api_url = f"https://openlibrary.org/search.json?q={subject}&limit=10&sort=editions&language=eng&page={result_page}"


        try:
            # Send a GET request to the API
            response = requests.get(api_url)

            # Check if the request was successful
            if response.status_code == 200:
                # Parse the JSON response
                data = response.json()
                return JsonResponse(data)
            else:
                # Handle the case where the request was not successful
                return JsonResponse({'error': 'Failed to retrieve data from the Open Library API'}, status=500)

        except requests.RequestException as e:
            # Handle any request-related errors
            return JsonResponse({'error': f'Request error: {str(e)}'}, status=500)
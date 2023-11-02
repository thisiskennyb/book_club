# from django.shortcuts import render

# # Create your views here.
# from your_app.models import Author, Book

# author = Author.objects.get(name='J.K. Rowling')

# # Try to get the book if it exists, or create it if it doesn't.
# book, created = Book.objects.get_or_create(author=author, title='Harry Potter and the Sorcerer\'s Stone')

# if created:
#     # The book was just created.
#     print("Created a new book:", book)
# else:
#     # The book already exists.
#     print("Got an existing book:", book)

# tests.py
from django.test import TestCase
from django.contrib.auth.models import User
from django.utils import timezone
from .models import BookClub, MessageBoardPost
from book.models import Book

class BookClubModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create(username='testuser')
        self.book = Book.objects.create(
            author='Test Author',
            title='Test Book',
            pages=100,
            book_cover_id='test_cover_id',
            open_library_id='test_open_library_id'
        )
        self.book_club = BookClub.objects.create(
            user=self.user,
            book=self.book,
            name='Test Book Club'
        )

    def test_book_club_creation(self):
        self.assertEqual(self.book_club.name, 'Test Book Club')
        self.assertEqual(self.book_club.book, self.book)
        self.assertEqual(self.book_club.user, self.user)
     

class MessageBoardPostModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create(username='testuser')
        self.book = Book.objects.create(
            author='Test Author',
            title='Test Book',
            pages=100,
            book_cover_id='test_cover_id',
            open_library_id='test_open_library_id'
        )
        self.book_club = BookClub.objects.create(
            user=self.user,
            book=self.book,
            name='Test Book Club'
        )
        self.message_board_post = MessageBoardPost.objects.create(
            bookclub=self.book_club,
            user=self.user,
            message='Test Message',
            time=timezone.now()
        )

    def test_message_board_post_creation(self):
        self.assertEqual(self.message_board_post.message , 'Test Message')


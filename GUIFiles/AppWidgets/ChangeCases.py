from PyQt5.QtWidgets import QWidget, QVBoxLayout, QHBoxLayout
import random
import pyperclip

from CustomWrappers import PyCute


class ChangeCases(QWidget):

    def __init__(self):

        super().__init__()

        self.title = "Change Cases"

        self.text_box = PyCute.TextBox()

        # Buttons ----------------------------------------------------------------
        self.text_to_upper_button = self.get_text_to_upper_button()
        self.text_to_lower_button = self.get_text_to_lower_button()
        self.text_to_title_button = self.get_text_to_title_button()
        self.text_to_random_case_button = self.get_text_to_random_case_button()
        self.text_to_spaced_out_button = self.get_text_to_spaced_out_button()
        self.copy_button = self.get_copy_button()
        self.clear_button = self.get_clear_button()
        # ------------------------------------------------------------------------

        self.setLayout(
            PyCute.add_to_layout(
                QVBoxLayout(),
                self.text_box,
                PyCute.add_to_layout(
                    QHBoxLayout(),
                    self.copy_button,
                    self.clear_button
                ),
                self.text_to_upper_button,
                self.text_to_lower_button,
                self.text_to_title_button,
                self.text_to_random_case_button,
                self.text_to_spaced_out_button,
            )
        )

    def get_text_to_upper_button(self):
        def button_connect_func():
            self.text_box.setText(self.text_box.text().upper())
        return PyCute.Button(default_text="Upper Case", connect_func=button_connect_func)

    def get_text_to_lower_button(self):
        def button_connect_func():
            self.text_box.setText(self.text_box.text().lower())
        return PyCute.Button(default_text="Lower Case", connect_func=button_connect_func)

    def get_text_to_title_button(self):
        def button_connect_func():
            self.text_box.setText(self.text_box.text().title())
        return PyCute.Button(default_text="Title Case", connect_func=button_connect_func)

    def get_text_to_random_case_button(self):
        def button_connect_func():
            self.text_box.setText("".join([letter.lower() if random.randint(0, 1) == 0 else letter.upper()
                                           for letter in self.text_box.text()]))
        return PyCute.Button(default_text="Random Case", connect_func=button_connect_func)

    def get_text_to_spaced_out_button(self):
        def button_connect_func():
            self.text_box.setText(" ".join([letter for letter in self.text_box.text()]))
        return PyCute.Button(default_text="Spaced Text", connect_func=button_connect_func)

    def get_copy_button(self):
        def button_connect_func():
            pyperclip.copy(self.text_box.text())
        return PyCute.Button(default_text="Copy Text", connect_func=button_connect_func)

    def get_clear_button(self):
        def button_connect_func():
            self.text_box.setText("")
        return PyCute.Button(default_text="Clear Text", connect_func=button_connect_func)

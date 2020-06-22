from PyQt5.QtWidgets import QStackedWidget, QWidget, QVBoxLayout

from General import PyCute


class MainWidget(QWidget):

    def __init__(self):

        super().__init__()

        self.stacked_layout_count = 5
        self.stacked_widget = self.get_stacked_widget()

        self.setLayout(PyCute.add_to_layout(QVBoxLayout(), self.stacked_widget))

    def get_stacked_widget(self):
        stacked_widget = QStackedWidget()
        for i in range(self.stacked_layout_count):
            stacked_widget.addWidget(self.get_temp_widget(str(i)))
        return stacked_widget

    def get_temp_widget(self, default_text):
        temp_widget = QWidget()
        temp_widget.setLayout(PyCute.add_to_layout(QVBoxLayout(), PyCute.Button(default_text=default_text,
                                                                                connect_func=self.change_window)))
        return temp_widget

    def change_window(self):
        self.stacked_widget.setCurrentIndex((self.stacked_widget.currentIndex() + 1) % self.stacked_layout_count)

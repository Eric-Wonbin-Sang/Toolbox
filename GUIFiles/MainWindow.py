from PyQt5.QtWidgets import QMainWindow, QAction, QMenu, QWidget, QVBoxLayout, QStackedWidget

from GUIFiles.AppWidgets import ChangeCases
from General import Constants
from CustomWrappers import PyCute


class MainWindow(QMainWindow):

    def __init__(self):

        super().__init__()

        self.menu_to_widget_dict = {
            "Strings": {
                "Change Cases": ChangeCases.ChangeCases()
            },
            "PDFs": {
                "Image to PDF": get_temp_widget("text is 1"),
                "PDF to Image": get_temp_widget("text is 2"),
                "PDF to Text": None
            },
            "Calculators": {
                "Monitor Measurer": None,
                "Pythagorean": get_temp_widget("text is 3")
            },
            "Terminal Customizer": None
        }

        self.stacked_widget = QStackedWidget()
        self.menu_bar = self.get_menu_bar()

        self.setCentralWidget(self.stacked_widget)
        self.setup_gui()

    def change_stack_to_widget(self, widget_in_stack):
        def change_stack_to_widget_helper():
            if widget_in_stack is not None:
                self.stacked_widget.setCurrentWidget(widget_in_stack)
            else:
                print("Widget is None")
        return change_stack_to_widget_helper

    def get_menu_bar(self):

        def get_menu_bar_helper(q_menu, menu_option_name, dict_value):
            if type(dict_value) == dict:
                temp_q_menu = QMenu(menu_option_name, self)
                for temp_menu_option in dict_value:
                    get_menu_bar_helper(temp_q_menu, temp_menu_option, dict_value[temp_menu_option])
                q_menu.addMenu(temp_q_menu)
            else:
                temp_action = QAction(menu_option_name, self)
                if dict_value is not None:
                    self.stacked_widget.addWidget(dict_value)   # adds widgets to the stack
                temp_action.triggered.connect(self.change_stack_to_widget(dict_value))
                q_menu.addAction(temp_action)

        menu_bar = self.menuBar()
        for menu_option in self.menu_to_widget_dict:
            get_menu_bar_helper(menu_bar, menu_option, self.menu_to_widget_dict[menu_option])

        return menu_bar

    def setup_gui(self):
        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle(Constants.main_window_title)
        self.show()


def get_temp_widget(default_text):
    temp_widget = QWidget()
    temp_widget.setLayout(PyCute.add_to_layout(QVBoxLayout(), PyCute.Button(default_text=default_text,
                                                                            connect_func=None)))
    return temp_widget

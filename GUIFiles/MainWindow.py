from PyQt5.QtWidgets import QMainWindow, QAction, QMenu

from GUIFiles import MainWidget
from General import Constants


class MainWindow(QMainWindow):

    def __init__(self):

        super().__init__()

        self.menu_to_widget_dict = {
            "Strings": {
                "Change Cases": None
            },
            "PDFs": {
                "Image to PDF": None,
                "PDF to Image": None,
                "PDF to Text": None
            },
            "Calculators": {
                "Monitor Measurer": None,
                "Pythagorean": None
            },
            "Terminal Customizer": None
        }

        self.menu_bar = self.get_menu_bar()
        self.main_widget = MainWidget.MainWidget()

        self.setCentralWidget(self.main_widget)
        self.setup_gui()

    def change_stack_to_widget(self, widget_in_stack):
        def change_stack_to_widget_helper():
            if widget_in_stack is not None:
                self.main_widget.stacked_widget.setCurrentWidget(widget_in_stack)
            else:
                print("Widget is None")
        return change_stack_to_widget_helper

    def get_menu_bar(self):

        menu_bar = self.menuBar()

        def get_menu_bar_helper(q_menu, menu_option_name, dict_value):
            if type(dict_value) == dict:
                # print("PARENT -", menu_option_name)
                temp_q_menu = QMenu(menu_option_name, self)
                for temp_menu_option in dict_value:
                    # print("NESTED -", temp_menu_option)
                    get_menu_bar_helper(temp_q_menu, temp_menu_option, dict_value[temp_menu_option])
                q_menu.addMenu(temp_q_menu)
            else:
                temp_action = QAction(menu_option_name, self)
                temp_action.triggered.connect(self.change_stack_to_widget(dict_value))
                q_menu.addAction(temp_action)
                # print("OPTION -", menu_to_widget_key)

        for menu_option in self.menu_to_widget_dict:
            get_menu_bar_helper(menu_bar, menu_option, self.menu_to_widget_dict[menu_option])

        return menu_bar

    def setup_gui(self):
        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle(Constants.main_window_title)
        self.show()

from PyQt5.QtWidgets import QMainWindow, QAction, QMenu

from GUIFiles import MainWidget


class MainWindow(QMainWindow):

    def __init__(self):

        super().__init__()

        self.menu_bar = self.get_menu_bar()
        self.main_widget = MainWidget.MainWidget()

        self.setCentralWidget(self.main_widget)
        self.setup_gui()

    def get_menu_bar(self):
        menu_bar = self.menuBar()
        file_menu = menu_bar.addMenu('File')

        imp_menu = QMenu('Import', self)
        imp_act = QAction('Import mail', self)
        imp_menu.addAction(imp_act)

        new_act = QAction('New', self)

        file_menu.addAction(new_act)
        file_menu.addMenu(imp_menu)

        return menu_bar

    def setup_gui(self):
        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle('Application')
        self.show()

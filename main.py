import sys
from PyQt5 import QtWidgets

from GUIFiles import MainWindow


def main():
    app = QtWidgets.QApplication(sys.argv)
    gui = MainWindow.MainWindow()
    sys.exit(app.exec_())


if __name__ == '__main__':
    main()

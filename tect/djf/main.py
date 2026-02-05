# from PyQt6.QtWidgets import QTableWidgetItem
# from PyQt6.QtWidgets import QApplication
# from PyQt6 import uic
# Form, Windows = uic.loadUiType('C:\joxan\djf\mani1.ui')
# win = QApplication([])
# windows = Windows()
# form = Form()
# form.setupUi(windows)
# row = 0
# form.tableWidget.setColumnCount(4)
# form.tableWidget.setHorizontalHeaderLabels(["Столбец1", "Столбец2", "Столбец3",
#                                              "Столбец4", "Столбец5", "Столбец6"])
# def push():
#     global row
#     data1 = form.lineEdit.text()
#     data2 = form.lineEdit_2.text()
#     data3 = form.lineEdit_3.text()
#     data4 = form.lineEdit_4.text()
#     form.tableWidget.setColumnCount(form.tableWidget.columnCount()+1)
#     form.tableWidget.setHorizontalHeaderLabels(["Столбец1", "Столбец2", "Столбец3",
#                                              "Столбец4", "Столбец5", "Столбец6"])

#     row+=1
#     form.tableWidget.setRowCount(row)
#     for col, data in enumerate((data1, data2,data3, data4) ):
#         form.tableWidget.setItem(row-1, col, QTableWidgetItem(str(data)))
#     form.tableWidget.setItem(row-1, 0, QTableWidgetItem(str(data1)))
#     form.tableWidget.setItem(row-1, 1, QTableWidgetItem(str(data2)))
#     form.tableWidget.setItem(row-1, 2, QTableWidgetItem(str(data3)))
#     form.tableWidget.setItem(row-1, 3, QTableWidgetItem(str(data4)))


# form.pushButton.clicked.connect(push) 
# windows.show()
# win.exec()

# from PyQt6.QtWidgets import QTableWidgetItem
# from PyQt6.QtWidgets import QApplication
# from PyQt6 import uic
# Form, Windows = uic.loadUiType('C:\joxan\djf\mani1.ui')
# win = QApplication([])
# windows = Windows()
# form = Form()
# form.setupUi(windows)

# form.tableWidget.setRowCount(4)  
# form.tableWidget.setColumnCount(0)  
# form.tableWidget.setVerticalHeaderLabels(["Строка1", "Строка2", "Строка3", "Строка4"])

# def push():
#     col = form.tableWidget.columnCount()
#     form.tableWidget.setColumnCount(col + 1)
#     data = [
#         form.lineEdit.text(),
#         form.lineEdit_2.text(),
#         form.lineEdit_3.text(),
#         form.lineEdit_4.text()
#     ]
#     for row, value in enumerate(data):
#         form.tableWidget.setItem(row, col, QTableWidgetItem(value))
#     form.tableWidget.setHorizontalHeaderLabels(
#         [f"Столбец {i+1}" for i in range(form.tableWidget.columnCount())]
#     )

# form.pushButton.clicked.connect(push)
# windows.show()
# win.exec()


from PyQt6.QtWidgets import QTableWidgetItem
from PyQt6.QtWidgets import QApplication
from PyQt6 import uic

Form, Windows = uic.loadUiType("C:\joxan\djf\mani.ui")
app = QApplication([])
window = Windows()
form = Form()
form.setupUi(window)

def juv():
    start = form.doubleSpinBox.value()
    end = form.doubleSpinBox_2.value()
    step = form.doubleSpinBox_3.value()

    if step <= 0:
        return  

    x_juv = []
    y_juv = []

    x = start
    while x <= end:
        y = x ** 2
        x_juv.append(x)
        y_juv.append(y)
        x += step

    form.tableWidget.clearContents()
    form.tableWidget.setRowCount(len(x_juv))
    form.tableWidget.setColumnCount(2)
    form.tableWidget.setHorizontalHeaderLabels(["x", "y"])
    for i, (x_j, y_j) in enumerate(zip(x_juv, y_juv)):
        form.tableWidget.setItem(i, 0, QTableWidgetItem(f"{x_j:.4f}"))
        form.tableWidget.setItem(i, 1, QTableWidgetItem(f"{y_j:.4f}"))

    form.tableWidget_2.clearContents()
    form.tableWidget_2.setRowCount(len(x_juv))
    form.tableWidget_2.setColumnCount(1)
    form.tableWidget_2.setHorizontalHeaderLabels(["y = x^2"])
    for i, y_j in enumerate(y_juv):
        form.tableWidget_2.setItem(i, 0, QTableWidgetItem(f"{y_j:.4f}"))

form.pushButton.clicked.connect(juv)
window.show()
app.exec()

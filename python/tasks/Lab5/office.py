import json


class Office:
    employeesNum = 0

    def __init__(self, name):
        self.name = name
        self.employees = []

    @classmethod
    def change_emps_num(cls, num):
        cls.employeesNum = num

    def get_all_employees(self):
        return self.employees

    def get_employee(self, emp_id):
        for emp in self.employees:
            if emp.id == emp_id:
                return emp
        print(f"Employee with id {emp_id} not found.")
        return None

    def hire(self, employee):
        self.employees.append(employee)
        Office.change_emps_num(Office.employeesNum + 1)
        print(f"{employee.name} has been hired at {self.name}.")

    def fire(self, emp_id):
        emp = self.get_employee(emp_id)
        if emp:
            self.employees.remove(emp)
            Office.change_emps_num(Office.employeesNum - 1)
            print(f"{emp.name} has been fired from {self.name}.")

    def deduct(self, emp_id, deduction):
        emp = self.get_employee(emp_id)
        if emp:
            emp.salary -= deduction
            print(f"Deducted {deduction} from {emp.name}. New salary: {emp.salary}.")

    def reward(self, emp_id, reward_amount):
        emp = self.get_employee(emp_id)
        if emp:
            emp.salary += reward_amount
            print(f"Rewarded {emp.name} with {reward_amount}. New salary: {emp.salary}.")

    @staticmethod
    def calculate_lateness(targetHour, moveHour, distance, velocity):
        travel_time = distance / velocity
        arrival_hour = moveHour + travel_time
        return arrival_hour > targetHour

    def check_lateness(self, emp_id, moveHour):
        emp = self.get_employee(emp_id)
        if emp and emp.car:
            is_late = Office.calculate_lateness(
                targetHour=9,
                moveHour=moveHour,
                distance=emp.distanceToWork,
                velocity=emp.car.velocity if emp.car.velocity > 0 else 80
            )
            if is_late:
                print(f"{emp.name} is LATE!")
                self.deduct(emp_id, 10)
            else:
                print(f"{emp.name} is ON TIME!")
                self.reward(emp_id, 10)

    def to_dict(self):
        return {
            "office": self.name,
            "employeesNum": Office.employeesNum,
            "employees": [emp.to_dict() for emp in self.employees],
        }

    def save_to_json(self, filename="office_data.json"):
        with open(filename, "w") as f:
            json.dump(self.to_dict(), f, indent=4)
        print(f"Office data saved to {filename}")
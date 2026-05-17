import re
from person import Person


class Employee(Person):
    def __init__(self, name, emp_id, email, salary, distanceToWork, car=None,
                 money=500, mood="happy", healthRate=100):
        super().__init__(name, money, mood, healthRate)
        self.id = emp_id
        self.email = email
        self.salary = salary
        self.distanceToWork = distanceToWork
        self.car = car

    @property
    def salary(self):
        return self._salary

    @salary.setter
    def salary(self, value):
        if value < 1000:
            raise ValueError("Salary must be at least 1000.")
        self._salary = value

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(pattern, value):
            raise ValueError(f"Invalid email: {value}")
        self._email = value

    def work(self, hours):
        if hours == 8:
            self.mood = Person.moods[0]
        elif hours > 8:
            self.mood = Person.moods[1]
        else:
            self.mood = Person.moods[2]
        print(f"{self.name} worked {hours} hours and feels {self.mood}.")

    def drive(self, distance):
        if self.car is None:
            print(f"{self.name} has no car!")
            return
        print(f"{self.name} is driving {distance} km.")
        self.car.run(velocity=80, distance=distance)

    def refuel(self, gasAmount=100):
        if self.car is None:
            print(f"{self.name} has no car!")
            return
        self.car.fuelRate = min(100, self.car.fuelRate + gasAmount)
        print(f"{self.name} refueled. Fuel rate is now: {self.car.fuelRate}%.")

    def send_mail(self, to, subject, msg, receiver_name):
        email_content = (
            f"From: {self.email}\n"
            f"To: {to}\n\n"
            f"Hi, {receiver_name}\n"
            f"{msg}\n"
            f"thanks\n\n"
            f"{subject}"
        )
        filename = f"email_{receiver_name}.txt"
        with open(filename, "w") as f:
            f.write(email_content)
        print(f"Email saved to {filename}")

    def __str__(self):
        return f"Employee(id={self.id}, name={self.name}, salary={self.salary})"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "salary": self.salary,
            "distanceToWork": self.distanceToWork,
            "mood": self.mood,
            "healthRate": self.healthRate,
            "money": self.money,
            "car": self.car.to_dict() if self.car else None,
        }
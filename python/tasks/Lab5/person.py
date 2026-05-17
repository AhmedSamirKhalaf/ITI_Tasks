class Person:
    moods = ("happy", "tired", "lazy")

    def __init__(self, name, money=500, mood="happy", healthRate=100):
        self.name = name
        self.money = money
        self.mood = mood
        self.healthRate = healthRate

    @property
    def healthRate(self):
        return self._healthRate

    @healthRate.setter
    def healthRate(self, value):
        if not (0 <= value <= 100):
            raise ValueError("healthRate must be between 0 and 100.")
        self._healthRate = value

    def sleep(self, hours):
        if hours == 7:
            self.mood = Person.moods[0]
        elif hours < 7:
            self.mood = Person.moods[1]
        else:
            self.mood = Person.moods[2]
        print(f"{self.name} slept {hours} hours and feels {self.mood}.")

    def eat(self, meals):
        if meals >= 3:
            self.healthRate = 100
        elif meals == 2:
            self.healthRate = 75
        else:
            self.healthRate = 50
        print(f"{self.name} ate {meals} meal(s). Health rate: {self.healthRate}%.")

    def buy(self, items):
        cost = items * 10
        self.money -= cost
        print(f"{self.name} bought {items} item(s) for {cost} L.E. Remaining money: {self.money} L.E.")

    def __str__(self):
        return f"Person({self.name}, mood={self.mood}, health={self.healthRate})"
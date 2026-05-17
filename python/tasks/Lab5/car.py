class Car:
    def __init__(self, name, fuelRate=100, velocity=0):
        self.name = name
        self.fuelRate = fuelRate
        self.velocity = velocity

    @property
    def velocity(self):
        return self._velocity

    @velocity.setter
    def velocity(self, value):
        if not (0 <= value <= 200):
            raise ValueError("Velocity must be between 0 and 200.")
        self._velocity = value

    @property
    def fuelRate(self):
        return self._fuelRate

    @fuelRate.setter
    def fuelRate(self, value):
        self._fuelRate = max(0, min(100, value))

    def run(self, velocity, distance):
        self.velocity = velocity
        print(f"{self.name} is running at {self.velocity} km/h.")

        intervals = int(distance // 10)
        remaining_distance = distance

        for i in range(intervals):
            if self.fuelRate <= 0:
                remaining_distance = distance - (i * 10)
                self.stop(remaining_distance)
                return
            self.fuelRate -= self.fuelRate * 0.10
            remaining_distance -= 10

        if self.fuelRate > 0:
            self.stop(0)
        else:
            self.stop(remaining_distance)

    def stop(self, remaining_distance=0):
        self.velocity = 0
        if remaining_distance <= 0:
            print(f"{self.name} has arrived at the destination!")
        else:
            print(f"{self.name} stopped. Remaining distance: {remaining_distance} km. Out of fuel!")

    def to_dict(self):
        return {
            "name": self.name,
            "fuelRate": self.fuelRate,
            "velocity": self.velocity,
        }
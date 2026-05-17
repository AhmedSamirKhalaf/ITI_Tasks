import random
import webbrowser
from car import Car
from person import Person
from employee import Employee
from office import Office



def open_random_website():
    websites = [
        "https://www.google.com",
        "https://www.github.com",
        "https://www.youtube.com",
        "https://www.wikipedia.org",
        "https://www.stackoverflow.com",
    ]
    chosen = random.choice(websites)
    print(f"Opening: {chosen}")
    webbrowser.open(chosen)


if __name__ == "__main__":

    # --- LAB FUN ---
    print("=" * 50)
    print("LAB FUN: Random Website")
    print("=" * 50)
    #open_random_website()  # uncomment to open browser

    # --- Create objects ---
    print("\n" + "=" * 50)
    print("Creating Objects")
    print("=" * 50)

    fiat128 = Car(name="Fiat 128", fuelRate=100, velocity=0)

    samy = Employee(
        name="Samy",
        emp_id=1,
        email="samy@iti.com",
        salary=5000,
        distanceToWork=20,
        car=fiat128,
    )

    iti = Office(name="ITI Smart Village")
    iti.hire(samy)

    # --- Person methods ---
    print("\n" + "=" * 50)
    print("Person Methods")
    print("=" * 50)
    samy.sleep(7)
    samy.eat(3)
    samy.buy(2)

    # --- Employee methods ---
    print("\n" + "=" * 50)
    print("Employee Methods")
    print("=" * 50)
    samy.work(8)
    samy.refuel(100)
    samy.drive(20)

    # --- Office methods ---
    print("\n" + "=" * 50)
    print("Office Methods")
    print("=" * 50)
    print("All employees:", iti.get_all_employees())
    print("Get Samy:", iti.get_employee(1))
    iti.check_lateness(emp_id=1, moveHour=8)
    iti.reward(1, 500)
    iti.deduct(1, 100)

    # --- Send email ---
    print("\n" + "=" * 50)
    print("Send Email")
    print("=" * 50)
    samy.send_mail(
        to="manager@iti.com",
        subject="Daily Report",
        msg="This is my daily work report.",
        receiver_name="Manager"
    )

    
    print("\n" + "=" * 50)
    print("Save Office Data as JSON")
    print("=" * 50)
    iti.save_to_json("office_data.json")

import os


class Colors:
    GREEN = "green"
    RED = "red"
    BLACK = "black"


def get_color_from_number(number: int) -> str:
    if number == 0:
        return Colors.GREEN
    if 0 < number <= 7:
        return Colors.RED
    if 8 <= number <= 14:
        return Colors.BLACK
    else:
        raise Exception("Number not in accepted range")


def read_file(file_path: str) -> list[list[str]]:
    with open(file_path, newline="") as file:
        colors = []
        for line in file.readlines():
            numbers = line.strip().split(",")
            # reverse array as values are stored from newest to oldest
            numbers.reverse()
            try:
                parsed_numbers = list(map(lambda x: int(x), numbers))
                colors.append(list(map(get_color_from_number, parsed_numbers)))
            except Exception as e:
                # parsing numbers failed - that means numbers list contains color strings
                colors.append(numbers)
        return colors


def find_opposite_after_n(numbers, n):
    if len(numbers) < n:
        return "Lista jest za krótka, aby przeprowadzić analizę."

    # Sprawdzamy, czy ostatnie n elementów ma tę samą wartość
    last_elements = numbers[-n:]
    if all(x == last_elements[0] for x in last_elements):
        target_value = 1 if last_elements[0] == 2 else 2

        # Szukamy elementu przeciwnego w następnych elementach listy
        for i in range(len(numbers)):
            if numbers[i] == target_value:
                return (
                    f"Element przeciwny ({target_value}) pojawia się po {i} elementach."
                )
        return f"Element przeciwny ({target_value}) nie pojawia się w liście."
    else:
        return "Ostatnie n elementów nie są identyczne."


for file in os.listdir("./"):
    if not file.endswith(".csv"):
        continue
    print(f"\n====================\nData from file: {file}\n====================\n")
    colors = read_file(f"{file}")
    for sequence in colors:
        n = 3
        print(find_opposite_after_n(sequence, n))

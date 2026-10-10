import os
import pandas as pd
import matplotlib.pyplot as plt
import _csv

def main():
    """Main program."""

    print("EV CHARGING DATA ANALYZER")
    print("\n")

    file_path = "data/ev_charging_patterns.csv"

    df = load_data(file_path)

    if df is None:
        return

    display_dataset_info(df)

    calculate_statistics(df)

    analyze_charger_types(df)

    analyze_vehicle_models(df)

    analyze_locations(df)

    create_location_chart(df)

    create_charger_type_chart(df)

    create_vehicle_energy_chart(df)

    print("\n")
    print("ANALYSIS COMPLETED SUCCESSFULLY!")
    print("\n")

def load_data(file_path):
    print("\nLoading dataset...")

    try:
        df = pd.read_csv(file_path)
        return df

    except FileNotFoundError:
        print(f"Error: File not found: {file_path}")
        return None

    except Exception as error:
        print(f"Something wrong: {error}")
        return None


def display_dataset_info(df):
    """Display basic information about the dataset."""

    print("\n")
    print("DATASET INFORMATION")
    print("\n")

    print(f"\nTotal rows: {len(df)}")
    print(f"Total columns: {len(df.columns)}")

    print("\nColumn names:")

    for column in df.columns:
        print(f"- {column}")

    print("\nMissing values:")

    print(df.isnull().sum())


def calculate_statistics(df):
    """Calculate basic charging statistics."""

    print("\n")
    print("EV CHARGING STATISTICS")
    print("\n")

    numerical_columns = [
        "Energy Consumed (kWh)",
        "Charging Duration (hours)",
        "Charging Rate (kW)",
        "Charging Cost (USD)"
    ]

    for column in numerical_columns:

        if column in df.columns:

            average_value = df[column].mean()

            print(
                f"Average {column}: "
                f"{average_value:.2f}"
            )


def analyze_charger_types(df):
    """Analyze charging rate by charger type."""

    if (
        "Charger Type" not in df.columns
        or "Charging Rate (kW)" not in df.columns
    ):
        return

    print("\n")
    print("AVERAGE CHARGING RATE BY CHARGER TYPE")
    print("\n")

    results = (
        df.groupby("Charger Type")["Charging Rate (kW)"]
        .mean()
        .sort_values(ascending=False)
    )

    print(results)


def analyze_vehicle_models(df):
    """Analyze energy consumption by vehicle model."""

    if (
        "Vehicle Model" not in df.columns
        or "Energy Consumed (kWh)" not in df.columns
    ):
        return

    print("AVERAGE ENERGY CONSUMPTION BY VEHICLE")
    print("\n")

    results = (
        df.groupby("Vehicle Model")["Energy Consumed (kWh)"]
        .mean()
        .sort_values(ascending=False)
    )

    print(results)


def analyze_locations(df):
    """Count charging sessions by location."""

    if "Charging Station Location" not in df.columns:
        return

    print("CHARGING SESSIONS BY LOCATION")
    print("\n")

    results = df["Charging Station Location"].value_counts()

    print(results)


def create_location_chart(df):
    """Create a chart showing charging sessions by location."""

    if "Charging Station Location" not in df.columns:
        return

    os.makedirs("output", exist_ok=True)

    location_counts = (
        df["Charging Station Location"]
        .value_counts()
    )

    plt.figure(figsize=(10, 6))

    location_counts.plot(
        kind="bar"
    )

    plt.title(
        "EV Charging Sessions by Location"
    )

    plt.xlabel(
        "Location"
    )

    plt.ylabel(
        "Number of Charging Sessions"
    )

    plt.xticks(
        rotation=45
    )

    plt.tight_layout()

    plt.savefig(
        "output/charging_sessions_by_location.png"
    )

    plt.close()

    print(
        "\nChart saved: "
        "output/charging_sessions_by_location.png"
    )


def create_charger_type_chart(df):
    """Create a chart showing average charging rate."""

    if (
        "Charger Type" not in df.columns
        or "Charging Rate (kW)" not in df.columns
    ):
        return

    os.makedirs("output", exist_ok=True)

    results = (
        df.groupby("Charger Type")["Charging Rate (kW)"]
        .mean()
        .sort_values(ascending=False)
    )

    plt.figure(figsize=(10, 6))

    results.plot(
        kind="bar"
    )

    plt.title(
        "Average Charging Rate by Charger Type"
    )

    plt.xlabel(
        "Charger Type"
    )

    plt.ylabel(
        "Average Charging Rate (kW)"
    )

    plt.xticks(
        rotation=45
    )

    plt.tight_layout()

    plt.savefig(
        "output/charging_rate_by_charger_type.png"
    )

    plt.close()

    print(
        "Chart saved: "
        "output/charging_rate_by_charger_type.png"
    )


def create_vehicle_energy_chart(df):
    """Create a chart showing energy consumption by vehicle."""

    if (
        "Vehicle Model" not in df.columns
        or "Energy Consumed (kWh)" not in df.columns
    ):
        return

    os.makedirs("output", exist_ok=True)

    results = (
        df.groupby("Vehicle Model")["Energy Consumed (kWh)"]
        .mean()
        .sort_values(ascending=False)
        .head(15)
    )

    plt.figure(figsize=(15, 8))

    results.plot(
        kind="bar"
    )

    plt.title(
        "Average Energy Consumption by Vehicle Model"
    )

    plt.xlabel(
        "Vehicle Model"
    )

    plt.ylabel(
        "Average Energy Consumed (kWh)"
    )

    plt.xticks(
        rotation=55,
        ha="right"
    )
    # plt.color_sequences = plt.cm.viridis(
    #     range(len(results))
    # )
    plt.tight_layout()

    plt.savefig(
        "output/energy_by_vehicle_model.png"
    )

    plt.close()

    print(
        "Chart saved: "
        "output/energy_by_vehicle_model.png"
    )


if __name__ == "__main__":
    main()
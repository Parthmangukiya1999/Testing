# EV Charging Data Analyzer

## 1. About the Project

The **EV Charging Data Analyzer** is a Python programme that looks at electric vehicle (EV) charging data.

The programme reads data from a CSV file and gives simple information about EV charging. It also creates charts to make the results easier to understand.

The programme can show:

- How many charging records are in the file
- The names of the data columns
- Missing data
- Average energy used
- Average charging time
- Average charging speed
- Average charging cost
- Charging sessions by location
- Charging speed for different charger types
- Energy used by different car models

------------------------------------------------------------------------

## 2. Purpose

The main purpose of this project is to make EV charging data easier to understand.

For example, the programme can help answer questions such as:

- How much energy is used during an average charging session?
- How long does charging normally take?
- Which charger type has the highest average charging speed?
- Which car model uses the most energy?
- Which location has the most charging sessions?

The programme also creates charts so that the results can be seen more easily.

------------------------------------------------------------------------

## 3. What the Programme Does

When the programme starts, it reads the EV charging data from a CSV file.

It then:

1.  Loads the data.
2.  Shows the number of rows and columns.
3.  Shows the names of the columns.
4.  Checks for missing data.
5.  Calculates average charging information.
6.  Compares different charger types.
7.  Compares different vehicle models.
8.  Counts charging sessions by location.
9.  Creates three charts.
10. Saves the charts in the `output` folder.

------------------------------------------------------------------------

## 4. Technologies Used

The programme is written in **Python**.

It uses two external Python packages:

### Pandas

Pandas is used to read the CSV file and work with the data.

It helps the programme:

- Read the data
- Find missing values
- Calculate averages
- Group information
- Count records

### Matplotlib

Matplotlib is used to create the charts.

The programme uses it to create and save the following charts:

- Charging sessions by location
- Average charging rate by charger type
- Average energy use by vehicle model

------------------------------------------------------------------------

## 5. Project Files

The project has the following structure:

```text
EV Charging Data Analyzer/
│
├── data/
│   └── ev_charging_patterns.csv
│
├── output/
│   ├── charging_sessions_by_location.png
│   ├── charging_rate_by_charger_type.png
│   └── energy_by_vehicle_model.png
│
├── ev_charging_analyzer.py
├── requirements.txt
└── readme.md
```

### What each file is for

| File or folder            | Purpose                                   |
|---------------------------|-------------------------------------------|
| `data/`                   | Contains the EV charging data             |
| `output/`                 | Contains the charts made by the programme |
| `ev_charging_analyzer.py` | Main Python programme                     |
| `requirements.txt`        | Lists the Python packages needed          |
| `readme.md`               | Project instructions and information      |

------------------------------------------------------------------------

## 6. Requirements

Before running the programme, you need:

- Python 3
- pip
- The EV charging CSV file

You can check if Python is installed by running:

```bash
python --version
```

You can check pip by running:

```bash
pip --version
```

------------------------------------------------------------------------

## 7. Installation

### Step 1: Open the project folder

Open a terminal or Command Prompt and go to the project folder.

For example:

```bash
cd "EV Charging Data Analyzer"
```

### Step 2: Install the required packages

Run:

```bash
python -m pip install -r requirements.txt
```

The file installs:

```text
pandas
matplotlib
```

### Step 3: Check the data file

If the downloaded project contains a folder named `Data`, rename it to `data`. The folder name must match the lowercase path used by the Python programme, especially on case-sensitive systems.

Make sure the CSV file is in:

```text
data/ev_charging_patterns.csv
```

------------------------------------------------------------------------

## 8. How to Run the Programme

After installing everything, run:

```bash
python ev_charging_analyzer.py
```

The programme will start reading the data and show the results in the terminal.

After the analysis is finished, the charts will be saved in the `output` folder.

------------------------------------------------------------------------

## 9. Example of the Results

The current dataset contains:

- **1,320 charging sessions**
- **20 columns**

The programme found the following average values:

| Information           |     Result |
|-----------------------|-----------:|
| Average energy used   |  42.64 kWh |
| Average charging time | 2.27 hours |
| Average charging rate |   25.96 kW |
| Average charging cost |    \$22.55 |

These results are based on the current dataset. The results may be different if another dataset is used.

------------------------------------------------------------------------

## 10. Charging Results

### Charger Types

The programme compares the average charging rate for each charger type.

The current results are:

| Charger type    | Average charging rate |
|-----------------|----------------------:|
| Level 2         |              26.33 kW |
| Level 1         |              26.00 kW |
| DC Fast Charger |              25.55 kW |

In this dataset, **Level 2** has the highest average charging rate.

------------------------------------------------------------------------

### Vehicle Models

The programme also compares the average energy used by each vehicle model.

The current results are:

| Vehicle model | Average energy used |
|---------------|--------------------:|
| Tesla Model 3 |           44.52 kWh |
| Hyundai Kona  |           42.83 kWh |
| Nissan Leaf   |           42.51 kWh |
| BMW i3        |           42.45 kWh |
| Chevy Bolt    |           40.74 kWh |

In this dataset, the **Tesla Model 3** has the highest average energy use.

------------------------------------------------------------------------

### Charging Locations

The programme counts the number of charging sessions at each location.

The current results are:

| Location      | Charging sessions |
|---------------|------------------:|
| Los Angeles   |               297 |
| San Francisco |               264 |
| Houston       |               262 |
| New York      |               255 |
| Chicago       |               242 |

In this dataset, **Los Angeles** has the highest number of charging sessions.

------------------------------------------------------------------------

## 11. Missing Data

The programme also checks for missing information.

In the current dataset, there are 66 missing values in each of these columns:

- Energy Consumed (kWh)
- Charging Rate (kW)
- Distance Driven (since last charge) (km)

The programme reports these missing values but does not automatically fill them.

------------------------------------------------------------------------

## 12. Charts

The programme creates three charts.

### 1. Charging Sessions by Location

File:

```text
output/charging_sessions_by_location.png
```

This chart shows the number of charging sessions in each location.

### 2. Average Charging Rate by Charger Type

File:

```text
output/charging_rate_by_charger_type.png
```

This chart compares the average charging rate of the different charger types.

### 3. Average Energy Use by Vehicle Model

File:

```text
output/energy_by_vehicle_model.png
```

This chart compares the average energy used by different vehicle models.

------------------------------------------------------------------------

## 13. Input Data

The programme uses the following data columns:

```text
User ID
Vehicle Model
Battery Capacity (kWh)
Charging Station ID
Charging Station Location
Charging Start Time
Charging End Time
Energy Consumed (kWh)
Charging Duration (hours)
Charging Rate (kW)
Charging Cost (USD)
Time of Day
Day of Week
State of Charge (Start %)
State of Charge (End %)
Distance Driven (since last charge) (km)
Temperature (°C)
Vehicle Age (years)
Charger Type
User Type
```

------------------------------------------------------------------------

## 14. Error Messages

If the CSV file cannot be found, the programme shows an error message.

For example:

```text
Error: File not found: data/ev_charging_patterns.csv
```

The programme also checks that the data needed for each analysis is available before doing that analysis.

------------------------------------------------------------------------

## 15. Current Limitations

The current version has some simple limitations:

- It only reads CSV files.
- The data file must be in the `data` folder.
- The programme runs in the terminal.
- It does not have a graphical interface.
- It does not automatically fix missing data.
- It provides basic analysis and charts.

------------------------------------------------------------------------

## 16. Possible Future Improvements

The programme could be improved in the future by adding:

- More charts
- More data analysis
- Automatic handling of missing data
- Analysis of charging times
- Analysis of charging costs
- Temperature analysis
- An interactive dashboard
- Export of results to Excel
- A simple web interface
- Machine learning to predict charging demand

------------------------------------------------------------------------

## 17. Maintainer

**Maintainer:** **Parth Mangukiya**

**Project:** EV Charging Data Analyzer

This project was created for educational purposes.

------------------------------------------------------------------------

## 18. Summary

The **EV Charging Data Analyzer** is a simple Python programme for working with EV charging data.

It reads charging data from a CSV file, finds useful information, calculates averages, compares vehicles and chargers, counts charging sessions by location, and creates charts.

The project shows how Python can be used to turn a large set of raw data into information that is easier to understand.

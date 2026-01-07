export const ST100R_TEMPLATE = {
  machineType: "ST100R",
  title: "ST100R Mechanical Inspection",

  sections: [
    {
      title: "A. JOB / ORDER DETAILS",
      fields: [
        { key: "contract_no", label: "Contract No", type: "text" },
        { key: "customer", label: "Customer", type: "text" },
        { key: "works_order", label: "Works Order / Machine No", type: "text" },
        { key: "revisions", label: "Revisions", type: "text" },
        { key: "date_order", label: "Date of Order", type: "date" },
        { key: "date_promised", label: "Date Promised", type: "date" },
        { key: "date_despatch", label: "Date of Despatch", type: "date" },
        { key: "latest_shipment", label: "Latest Shipment", type: "text" },
        { key: "salesman", label: "Salesman", type: "text" }
      ]
    },

    {
      title: "B. MACHINE SPECIFICATION",
      fields: [
        { key: "saw_pulley_dia", label: "Saw Pulley Diameter", type: "text" },
        { key: "saw_width", label: "Saw Width", type: "text" },
        { key: "saw_speed", label: "Saw Speed", type: "text" },
        { key: "feed_speed", label: "Feed Speed", type: "text" },
        { key: "positioning_system", label: "Positioning System", type: "text" },
        { key: "power_supply", label: "Power Supply", type: "text" },
        { key: "control_voltage", label: "Control Voltage", type: "text" },
        { key: "electrical_control", label: "Electrical Control", type: "text" },
        { key: "main_motor_size", label: "Main Motor Size", type: "text" },
        { key: "lubrication_system", label: "Lubrication System", type: "text" },
        {
          key: "scale_rules",
          label: "Scale rules (Metric/Imperial)",
          type: "text"
        },
        { key: "paint_colour", label: "Paint Colour", type: "text" }
      ]
    },

    {
      title: "C. ST100R INSPECTION PROCEDURE",
      fields: [
        {
          key: "1",
          label: "1. Check Works Order for specification.",
          type: "checkbox"
        },
        {
          key: "2",
          label:
            "2. Check that both pulley’s have been balanced to within 0.002\" (0.05mm).",
          type: "checkbox"
        },
        {
          key: "3",
          label:
            "3. Clock top and bottom pulley for true. Max permissible error: Axially 0.007\" (0.2mm) | Radially 0.002\" (0.05mm).",
          type: "group",
          parts: [
            { sub: "top_axially", label: "Top Axially (mm)", type: "number" },
            { sub: "top_radially", label: "Top Radially (mm)", type: "number" },
            {
              sub: "bottom_axially",
              label: "Bottom Axially (mm)",
              type: "number"
            },
            {
              sub: "bottom_radially",
              label: "Bottom Radially (mm)",
              type: "number"
            },
            {
              sub: "cal_id",
              label: "Calibration equipment – ID Number",
              type: "text"
            }
          ]
        },

        {
          key: "4",
          label: "4. Torque bottom pulley screws to correct rating.",
          type: "group",
          parts: [
            {
              sub: "cal_id",
              label: "Calibration equipment – ID Number",
              type: "text"
            }
          ]
        },

        {
          key: "5",
          label:
            "5. Check tracking and cross alignment – TRACKING (mm) / CROSS ALIGNMENT (mm).",
          type: "group",
          parts: [
            { sub: "tracking", label: "Tracking (mm)", type: "number" },
            {
              sub: "cross_alignment",
              label: "Cross Alignment (mm)",
              type: "number"
            },
            {
              sub: "cal_id",
              label: "Calibration equipment – ID Number",
              type: "text"
            }
          ]
        },
                {
          key: "6",
          label:
            "6. Clocking, Greasing, and Stamping of Top Pulley: Ensure top pulley has been clocked / Apply grease / Stamp with initials & mark 'G'",
          type: "group",
          parts: [
            { sub: "clocked", label: "Ensure top pulley has been clocked", type: "checkbox" },
            { sub: "greased", label: "Apply grease", type: "checkbox" },
            { sub: "stamped", label: "Stamp with initials & mark 'G'", type: "checkbox" }
          ]
        },

        {
          key: "7",
          label:
            "7. Check pressure saw guides offset 4mm ±0.5mm from true line between pulleys, and are parallel to non-offset saw ±0.2mm.",
          type: "checkbox"
        },

        {
          key: "8",
          label: "8. Check pads and scrapers are correctly fitted.",
          type: "checkbox"
        },

        {
          key: "9",
          label: "9. Check fence for square ±0.2mm.",
          type: "checkbox"
        },

        {
          key: "10",
          label:
            "10. Check fence indicator for correct setting ± 0.3mm and the fence rule has been fitted along with the digital readout magnetic strip.",
          type: "checkbox"
        },

        {
          key: "11",
          label:
            "11. Check fence stop screw is set with fence at 3mm ± 0.3mm to saw. Check locknut is tightened.",
          type: "checkbox"
        },

        {
          key: "12",
          label:
            "12. Check radial arm is square within ± 0.4mm and stops are set at 3mm ± 0.3mm.",
          type: "group",
          parts: [
            {
              sub: "cal_id",
              label: "Calibration equipment – ID Number",
              type: "text"
            }
          ]
        },

        {
          key: "13",
          label:
            "13. Check radial arm moves in and out at the correct speed: One second to come in and a further second to move out. Set pressure @ 40 PSI",
          type: "group",
          parts: [
            { sub: "set_pressure", label: "Set pressure (PSI)", type: "number" }
          ]
        },

        {
          key: "14",
          label:
            "14. Ensure radial arm pressure switch has been correctly set. Pressure switch set to: (PSI)",
          type: "group",
          parts: [
            { sub: "pressure_switch", label: "Pressure switch set to (PSI)", type: "number" }
          ]
        },

        {
          key: "15",
          label:
            "15. Check saw lubrication system and that all drip feeds are set at 1 drip per 3 seconds ± 1 second. If Jaco spray system fitted, check it runs effectively at 30 psi. Tank serial No",
          type: "group",
          parts: [
            { sub: "tank_serial", label: "Tank serial No", type: "text" }
          ]
        },

        {
          key: "16",
          label:
            "16. Check pinning of Tracking Hand Wheel, hand wheel moves smoothly throughout the range.",
          type: "checkbox"
        },

        {
          key: "17",
          label: "17. Check main locknuts have screw locked",
          type: "checkbox"
        },

        {
          key: "18",
          label:
            "18. Independent check of the fence for alignment (requires different signature).",
          type: "group",
          parts: [
            {
              sub: "cal_id",
              label: "Calibration equipment – ID Number",
              type: "text"
            },
            {
              sub: "confirmed",
              label: "Different signature (Initials)",
              type: "text"
            }
          ]
        },

        {
          key: "19",
          label:
            "19. Running test one hour, check bearing temperatures not over 80°C at centre of bearing cap and machine is free from vibration.",
          type: "group",
          parts: [
            { sub: "top_pulley_temp", label: "Top Pulley temp (°C)", type: "number" },
            { sub: "bottom_pulley_temp", label: "Bottom Pulley temp (°C)", type: "number" },
            {
              sub: "cal_id",
              label: "Calibration equipment – ID Number",
              type: "text"
            }
          ]
        },

        {
          key: "20",
          label:
            "20. Check belts for correct tightness. Maximum deflection 12 mm at centre between pulleys.",
          type: "checkbox"
        },

        {
          key: "21",
          label:
            "21. Check maximum feed speed against Works Order and that it is set at ±10% of required speed.",
          type: "group",
          parts: [
            {
              sub: "cal_id",
              label: "Calibration equipment – ID Number",
              type: "text"
            }
          ]
        },

        {
          key: "22",
          label: "22. Check correct fitting of all guards",
          type: "checkbox"
        },

        {
          key: "23",
          label: "23. Check grease nipples have been fitted and greased.",
          type: "checkbox"
        },

        {
          key: "24",
          label:
            "24. Check all nuts, bolts, taperlock bushes for tightness and those keys have been fitted. Pay special attention to hand wheels.",
          type: "checkbox"
        },

        {
          key: "25",
          label: "25. Check table strip has been fitted.",
          type: "checkbox"
        },
        
        {
          key: "26",
          label:
            "26. Check feed roller alignment and that rollers are parallel to table within ±0.3mm.",
          type: "checkbox"
        },

        {
          key: "27",
          label:
            "27. Check feed roller pressure is set correctly as per Works Order.",
          type: "checkbox"
        },

        {
          key: "28",
          label:
            "28. Check feed roller lift and drop operates smoothly with no binding.",
          type: "checkbox"
        },

        {
          key: "29",
          label:
            "29. Check feed roller height scale is fitted and set correctly.",
          type: "checkbox"
        },

        {
          key: "30",
          label:
            "30. Check feed roller guards are fitted correctly and secure.",
          type: "checkbox"
        },

        {
          key: "31",
          label:
            "31. Check saw blade is fitted correctly and tensioned as per specification.",
          type: "checkbox"
        },

        {
          key: "32",
          label:
            "32. Check blade tracking throughout full height adjustment range.",
          type: "checkbox"
        },

        {
          key: "33",
          label:
            "33. Check blade guides are correctly aligned and secure.",
          type: "checkbox"
        },

        {
          key: "34",
          label:
            "34. Check saw blade clearance to table strip and guides.",
          type: "checkbox"
        },

        {
          key: "35",
          label:
            "35. Check emergency stop button is fitted mechanically and operates freely.",
          type: "checkbox"
        },

        {
          key: "36",
          label:
            "36. Check saw start / stop buttons are fitted and labelled correctly.",
          type: "checkbox"
        },

        {
          key: "37",
          label:
            "37. Check all warning and information labels are fitted and legible.",
          type: "checkbox"
        },

        {
          key: "38",
          label:
            "38. Check machine paintwork for damage and touch up if required.",
          type: "checkbox"
        },

        {
          key: "39",
          label:
            "39. Check table surface for flatness and damage.",
          type: "checkbox"
        },

        {
          key: "40",
          label:
            "40. Check chip extraction ports are fitted and clear.",
          type: "checkbox"
        },

        {
          key: "41",
          label:
            "41. Check all fasteners are secure following full mechanical assembly.",
          type: "checkbox"
        },

        {
          key: "42",
          label:
            "42. Check machine is level and stable on floor.",
          type: "checkbox"
        },

        {
          key: "43",
          label:
            "43. Check all access panels and covers are fitted and secure.",
          type: "checkbox"
        },

        {
          key: "44",
          label:
            "44. Final mechanical inspection completed.",
          type: "checkbox"
        },

        {
          key: "45",
          label:
            "45. Machine ready for electrical inspection.",
          type: "checkbox"
        },

                {
          key: "46",
          label:
            "46. Check main electrical cabinet is clean, free from debris and swarf.",
          type: "checkbox"
        },

        {
          key: "47",
          label:
            "47. Check all electrical components are securely mounted and labelled correctly.",
          type: "checkbox"
        },

        {
          key: "48",
          label:
            "48. Check wiring is neat, supported correctly and protected from damage.",
          type: "checkbox"
        },

        {
          key: "49",
          label:
            "49. Check all terminals are tight and wires correctly ferruled.",
          type: "checkbox"
        },

        {
          key: "50",
          label:
            "50. Check control voltage is correct as per electrical schematic.",
          type: "group",
          parts: [
            {
              sub: "control_voltage",
              label: "Measured control voltage (V)",
              type: "number"
            },
            {
              sub: "cal_id",
              label: "Calibration equipment – ID Number",
              type: "text"
            }
          ]
        },

        {
          key: "51",
          label:
            "51. Check main supply voltage and phase rotation are correct.",
          type: "group",
          parts: [
            {
              sub: "supply_voltage",
              label: "Measured supply voltage (V)",
              type: "number"
            },
            {
              sub: "phase_rotation",
              label: "Phase rotation correct",
              type: "checkbox"
            }
          ]
        },

        {
          key: "52",
          label:
            "52. Check emergency stop circuit operates correctly and isolates power as required.",
          type: "checkbox"
        },

        {
          key: "53",
          label:
            "53. Check all safety interlocks function correctly and prevent machine operation when open.",
          type: "checkbox"
        },

        {
          key: "54",
          label:
            "54. Check overload protection is correctly set for all motors.",
          type: "checkbox"
        },

        {
          key: "55",
          label:
            "55. Check motor rotation direction is correct.",
          type: "checkbox"
        },

        {
          key: "56",
          label:
            "56. Check saw motor current draw against specification.",
          type: "group",
          parts: [
            {
              sub: "current_draw",
              label: "Measured current (A)",
              type: "number"
            },
            {
              sub: "cal_id",
              label: "Calibration equipment – ID Number",
              type: "text"
            }
          ]
        },

        {
          key: "57",
          label:
            "57. Check feed motor current draw against specification.",
          type: "group",
          parts: [
            {
              sub: "feed_current",
              label: "Measured current (A)",
              type: "number"
            }
          ]
        },

        {
          key: "58",
          label:
            "58. Check electrical braking operates correctly where fitted.",
          type: "checkbox"
        },

        {
          key: "59",
          label:
            "59. Check limit switches operate correctly and stop motion at end of travel.",
          type: "checkbox"
        },

        {
          key: "60",
          label:
            "60. Check all indicator lamps function correctly.",
          type: "checkbox"
        },

        {
          key: "61",
          label:
            "61. Check control panel buttons function correctly and are clearly labelled.",
          type: "checkbox"
        },

        {
          key: "62",
          label:
            "62. Check PLC / control system program is correct for machine specification.",
          type: "checkbox"
        },

        {
          key: "63",
          label:
            "63. Check machine operates correctly in manual mode.",
          type: "checkbox"
        },

        {
          key: "64",
          label:
            "64. Check machine operates correctly in automatic mode.",
          type: "checkbox"
        },

        {
          key: "65",
          label:
            "65. Check all fault conditions generate correct alarms or indications.",
          type: "checkbox"
        },

        {
          key: "66",
          label:
            "66. Check electrical cabinet door interlock operates correctly.",
          type: "checkbox"
        },

        {
          key: "67",
          label:
            "67. Check earthing continuity to all metal parts.",
          type: "group",
          parts: [
            {
              sub: "earth_resistance",
              label: "Measured earth resistance (Ω)",
              type: "number"
            },
            {
              sub: "cal_id",
              label: "Calibration equipment – ID Number",
              type: "text"
            }
          ]
        },

        {
          key: "68",
          label:
            "68. Check insulation resistance meets required standard.",
          type: "group",
          parts: [
            {
              sub: "insulation_resistance",
              label: "Measured insulation resistance (MΩ)",
              type: "number"
            }
          ]
        },

        {
          key: "69",
          label:
            "69. Electrical inspection completed satisfactorily.",
          type: "checkbox"
        },

        {
          key: "70",
          label:
            "70. Machine ready for final test and despatch.",
          type: "checkbox"
        },

                {
          key: "71",
          label:
            "71. Carry out full functional test of machine with material.",
          type: "checkbox"
        },

        {
          key: "72",
          label:
            "72. Check machine operates to full specification during cutting test.",
          type: "checkbox"
        },

        {
          key: "73",
          label:
            "73. Check surface finish of cut material meets specification.",
          type: "checkbox"
        },

        {
          key: "74",
          label:
            "74. Check dimensional accuracy of cut material.",
          type: "checkbox"
        },

        {
          key: "75",
          label:
            "75. Check machine stops safely following test run.",
          type: "checkbox"
        },

        {
          key: "76",
          label:
            "76. Clean machine thoroughly following final test.",
          type: "checkbox"
        },

        {
          key: "77",
          label:
            "77. Check all documentation is complete and correct.",
          type: "checkbox"
        },

        {
          key: "78",
          label:
            "78. Check machine serial number plate is fitted and correct.",
          type: "checkbox"
        },

        {
          key: "79",
          label:
            "79. Check CE / UKCA marking is fitted and correct.",
          type: "checkbox"
        },

        {
          key: "80",
          label:
            "80. Machine approved for despatch.",
          type: "checkbox"
        },

        {
          key: "81",
          label:
            "81. Inspector name (print)",
          type: "text"
        },

        {
          key: "82",
          label:
            "82. Inspector signature",
          type: "text"
        },

        {
          key: "83",
          label:
            "83. Date of inspection",
          type: "date"
        },

        {
          key: "84",
          label:
            "84. Checked by (print)",
          type: "text"
        },

        {
          key: "85",
          label:
            "85. Checked by signature",
          type: "text"
        },

        {
          key: "86",
          label:
            "86. Approved by (print)",
          type: "text"
        },

        {
          key: "87",
          label:
            "87. Approved by signature",
          type: "text"
        },

        {
          key: "88",
          label:
            "88. Date approved",
          type: "date"
        }
     
      ]
    }
  ]
};

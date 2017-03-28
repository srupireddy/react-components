var slideManagerConfig = {
    firstSlide: "residentCity",
    lastSlide: "contactMe",
    slides: [
        {
            modelKey: "residentCity",
            title: "Where do you live currently?",
            componentName: "City",
            componentProps: {
                variant: "Resident" 
            }
        },
        {
            modelKey: "residencyStatus",
            title: "Residency status",
            componentName: "ResidencyStatus"
        },
        {
            modelKey: "gender",
            title: "My gender",
            componentName: "Gender"
        },
        {
            modelKey: "propertyCity",
            title: "City in which property is based",
            componentName: "City",
            componentProps: {
                variant: "Property" 
            }
        },
        {
            modelKey: "employmentType",
            title: "Type of employment",
            componentName: "EmploymentType"
        },
        {
            modelKey: "purposeOfLoan",
            title: "How would you like to use your home loan?",
            componentName: "HomeLoanPurpose"
        },
        {
            modelKey: "coApplicantRelationship",
            title: "Who is the co-applicant?",
            componentName: "CoApplicantRelationship"
        },
        {
            modelKey: "landTransactionType",
            title: "Type of transaction",
            componentName: "LandTransactionType"
        },
        {
            modelKey: "landSellerDetail",
            title: "Who is the seller?",
            componentName: "LandSeller"
        },
        {
            modelKey: "landLocation",
            title: "Where is the land?",
            componentName: "LandLocation"
        },
        {
            modelKey: "propertyType",
            title: "Tell us about your property",
            componentName: "PropertyType"
        },
        {
            modelKey: "employer",
            title: "Company I work for",
            componentName: "Employer"
        },
        {
            modelKey: "joiningDate",
            title: "Joining date with your current organisation",
            componentName: "WorkExperience"
        },
        {
            modelKey: "existingLoanStartDate",
            title: "When did you begin your existing loan?",
            componentName: "Calendar",
            componentProps: {
                variant: "Last5Years"
            }
        },
        {
            modelKey: "builder",
            title: "Name of builder & project (optional)",
            componentName: "Builder"
        },
        {
            modelKey: "existingLoanDetails",
            title: "Which bank is your existing home loan with?",
            componentName: "ExistingLoanDetails"
        },
        {
            modelKey: "applyingWithCoApplicant",
            title: "How will the ownership be divided?",
            componentName: "ApplyingWithCoApplicant"
        },
        {
            modelKey: "coApplicantOwnershipSplit",
            title: "Would you like to add a co-applicant?",
            componentName: "CoApplicantOwnershipSplit"
        },
        {
            modelKey: "grossMonthlyIncome",
            title: "Gross fixed monthly income",
            componentName: "Money",
            componentProps: {
                currencyCode: "INR",
                min: 3000,
                max: 9999999,
                sliderMax: 120000,
                sliderStep: 1000,
                purpose: "Gross Monthly Income",
                tooltip: {
                    text: "Enter your gross monthly salary as per his/her your monthly payslip before deductions. Include only direct deposit or cheque payments. Exclude payments in hard cash and in-kind components."
                }
            },
            autoNext: false,
        },
        {
            modelKey: "annualBonus",
            title: "Total annual bonus (optional)",
            componentName: "Money",
            componentProps: {
                currencyCode: "INR",
                min: 0,
                max: 9999999,
                sliderMax: function(model) {return 4 * model["grossMonthlyIncome"]},
                sliderStep: 1000,
                purpose: "Annual Bonus",
                tooltip: {
                    text: "Enter your annual bonus, if any, excluding any cash component."
                }
            },
            autoNext: false,
            skippable: true
        },
        {
            modelKey: "monthlyIncentives",
            title: "Average monthly incentives (optional)",
            componentName: "Money",
            componentProps: {
                currencyCode: "INR",
                min: 0,
                max: 9999999,
                sliderMax: function(model) {return 2 * model["grossMonthlyIncome"]},
                sliderStep: 1000,
                purpose: "Average Monthly Incentives",
                tooltip: {
                    text: "Enter the approximate sum of all monthly incentives earned by you, if any. Include only direct deposit or cheque payments. Exclude payments in hard cash and in-kind components."
                }
            },
            autoNext: false,
            skippable: true
        },
        {
            modelKey: "latestProfitAfterTax",
            title: "Latest year's profit after tax",
            componentName: "Money",
            componentProps: {
                currencyCode: "INR",
                min: 10000,
                max: 9999999,
                sliderMax: 3000000,
                sliderStep: 5000,
                purpose: "Profit After Tax",
                tooltip: {
                    text: "Enter profit after tax as per your latest year's ITR."
                }
            },
            autoNext: false
        },
        {
            modelKey: "totalEMI",
            title: "Total EMIs you currently pay per month (if any)",
            componentName: "Money",
            componentProps: {
                currencyCode: "INR",
                min: 0,
                max: 9999999,
                sliderMin: 0,
                sliderMax:  function(model) {return Math.max(1/6 * model["latestProfitAfterTax"] || 0, 2 * model["grossMonthlyIncome"] || 0)},
                sliderStep: 100,
                purpose: "EMI",
                tooltip: {
                    text: "Enter the sum of all monthly payments by you on your currently ongoing loans."
                }
            },
            autoNext: false,
            skippable: true
        },
        {
            modelKey: "costOfLand",
            title: "Cost of land",
            componentName: "Money",
            componentProps: {
                currencyCode: "INR",
                min: 400000,
                max: 20000000,
                sliderMax:  function(model) {return Math.max(200 * model["latestProfitAfterTax"] || 0, 200 * model["grossMonthlyIncome"] || 0)},
                sliderStep: 10000,
                purpose: "Cost of land",
                tooltip: {
                    text: "Enter value as per Sale Agreement or as per the Registered Sale Deed value, whichever is higher"
                }
            },
            autoNext: false
        },
        {
            modelKey: "costOfProperty",
            title: "Cost of home/flat",
            componentName: "Money",
            componentProps: {
                currencyCode: "INR",
                min: 400000,
                max: 20000000,
                sliderMax: function(model) {return Math.max(200 * model["latestProfitAfterTax"] || 0, 200 * model["grossMonthlyIncome"] || 0)},
                sliderStep: 10000,
                purpose: "Cost Of Property",
                tooltip: {
                    text: "Include only the following components of cost:Basic Cost, car parking (if being sold),Firefighting charges,electricity/water charges,Electrification charges,Power Back Up,Internal Development Charges (IDC),External Development Charges (EDC),Preferential Location Charges (PLC),Interest Free Maintenance Security Deposit ( IFMS),Club Membership,VAT & Service Tax,Stamp duty and registration charges"
                }
            },
            autoNext: false
        },
        {
            modelKey: "costOfConstruction",
            title: "Cost of construction",
            componentName: "Money",
            componentProps: {
                currencyCode: "INR",
                min: 400000,
                max: 20000000,
                sliderMax: function(model) {return Math.max(200 * model["latestProfitAfterTax"] || 0, 200 * model["grossMonthlyIncome"] || 0)},
                sliderStep: 10000,
                purpose: "Cost of construction",
                tooltip: {
                    text: "Enter the cost of construction as per the engineering estimate."
                }
            },
            autoNext: false
        },
        {
            modelKey: "dob",
            title: "What's your age (years completed)?",
            componentName: "Calendar",
            componentProps: {
                variant: "DOB"
            }
        },

        {
            modelKey: "coApplicantResidentCity",
            title: "Which city does co-applicant live in?",
            componentName: "City",
            componentProps: {
                variant: "Resident" 
            }
        },
        {
            modelKey: "coApplicantResidencyStatus",
            title: "Co-applicant's residency status",
            componentName: "ResidencyStatus"
        },
        {
            modelKey: "coApplicantEmploymentType",
            title: "Co-applicant's type of employment",
            componentName: "EmploymentType"
        },
        {
            modelKey: "coApplicantEmployer",
            title: "Co-applicant's employer",
            componentName: "Employer"
        },
        {
            modelKey: "coApplicantJoiningDate",
            title: "Joining date of co-applicant with current organisation",
            componentName: "WorkExperience"
        },
        {
            modelKey: "coApplicantGrossMonthlyIncome",
            title: "Co-applicant's gross fixed monthly income",
            componentName: "Money",
            componentProps: {
                currencyCode: "INR",
                min: 3000,
                max: 9999999,
                sliderMin: 0,
                sliderMax: 120000,
                sliderStep: 1000,
                purpose: "Gross Monthly Income",
                tooltip: {
                    text: "Enter your gross monthly salary as per his/her your monthly payslip before deductions. Include only direct deposit or cheque payments. Exclude payments in hard cash and in-kind components."
                }
            },
            autoNext: false
        },
        {
            modelKey: "coApplicantAnnualBonus",
            title: "Co-applicant's total annual bonus (optional)",
            componentName: "Money",
            componentProps: {
                currencyCode: "INR",
                min: 0,
                max: 9999999,
                sliderMax: function(model) {return 4 * model["coApplicantGrossMonthlyIncome"]},
                purpose: "Annual Bonus",
                tooltip: {
                    text: "Enter your annual bonus, if any, excluding any cash component."
                }
            },
            autoNext: false,
            skippable: true
        },
        {
            modelKey: "coApplicantMonthlyIncentives",
            title: "Co-applicant's average monthly incentives (optional)",
            componentName: "Money",
            componentProps: {
                currencyCode: "INR",
                min: 0,
                max: 9999999,
                sliderMax: function(model) {return 2 * model["coApplicantGrossMonthlyIncome"]},
                purpose: "Average Monthly Incentives",
                tooltip: {
                    text: "Enter the approximate sum of all monthly incentives earned by you, if any. Include only direct deposit or cheque payments. Exclude payments in hard cash and in-kind components."
                }
            },
            autoNext: false,
            skippable: true
        },
        {
            modelKey: "coApplicantLatestProfitAfterTax",
            title: "Latest year's profit after tax for co-applicant",
            componentName: "Money",
            componentProps: {
                currencyCode: "INR",
                min: 0,
                max: 9999999,
                sliderMin: 0,
                sliderMax: 3000000,
                sliderStep: 5000,
                purpose: "Profit After Tax",
                tooltip: {
                    text: "Enter profit after tax as per your latest year's ITR."
                }
            },
            autoNext: false
        },
        {
            modelKey: "coApplicantTotalEMI",
            title: "Total EMIs paid by co-applicant per month currently (if any)",
            componentName: "Money",
            componentProps: {
                currencyCode: "INR",
                min: 0,
                max: 9999999,
                sliderMin: 0,
                sliderMax:  function(model) {return Math.max(1/6 * model["coApplicantLatestProfitAfterTax"] || 0, 2 * model["coApplicantGrossMonthlyIncome"] || 0)},
                sliderStep: 5000,
                purpose: "EMI",
                tooltip: {
                    text: "Enter the sum of all monthly payments by you on your currently ongoing loans."
                }
            },
            autoNext: false,
            skippable: true
        },
        {
            modelKey: "coApplicantDob",
            title: "Co-applicant's date of birth",
            componentName: "Calendar",
            componentProps: {
                variant: "DOB"
            }
        },
        {
            modelKey: "contactMe",
            title: "Need to talk? Leave your number, if you'd like to hear from us.",
            componentName: "ContactMe"
        }
    ],
    transitions: [
        {trigger: "next", from: "residentCity",
            to: {
                choices: [
                    {
                        to: "residencyStatus",
                        guard: function(model, from) {
                            return model["residentCountry"] == "Other"
                        }
                    },
                ],
                default: "gender"
            }
        },
        {trigger: "next", from: "residencyStatus",         to: "gender"},
        {trigger: "next", from: "gender",                  to: "propertyCity"},
        {trigger: "next", from: "propertyCity",            to: "employmentType"},
        {trigger: "next", from: "employmentType",
            to: {
                choices: [
                    {
                        to: "employer",
                        guard: function(model, from) {
                            return model["employmentType"] == "SALARIED" || model["employmentType"] == "SALARIED_PROFESSIONAL"
                        }
                    },
                    {
                        to: "latestProfitAfterTax",
                        guard: function(model, from) {
                            return model["employmentType"] == "SELF_EMPLOYED_BUSINESS" || model["employmentType"] == "SELF_EMPLOYED_PROFESSIONAL"
                        }
                    }
                ],
                default: "dob"
            }
        },
        {trigger: "next", from: "employer",                to: "joiningDate"},
        {trigger: "next", from: "joiningDate",             to: "grossMonthlyIncome"},
        {trigger: "next", from: "grossMonthlyIncome",      to: "annualBonus"},
        {trigger: "next", from: "annualBonus",             to: "monthlyIncentives"},
        {trigger: "next", from: "monthlyIncentives",       to: "totalEMI"},
        {trigger: "next", from: "latestProfitAfterTax",    to: "totalEMI"},
        {trigger: "next", from: "totalEMI",                to: "dob"},
        {trigger: "next", from: "dob",                     to: "purposeOfLoan"},
        {trigger: "next", from: "purposeOfLoan",
            to: {
                choices: [
                    {
                        to: "propertyType",
                        guard: function(model, from) {
                            return model["purposeOfLoan"] == "PURCHASE_IDENTIFIED_PROPERTY" || model["purposeOfLoan"] == "TRANSFER_EXISTING_HOME_LOAN"
                        }
                    }
                ],
                default: "applyingWithCoApplicant"
            }
        },
        {trigger: "next", from: "propertyType",
            to: {
                choices: [
                    {
                        to: "costOfLand",
                        guard: function(model, from) {
                            return model["propertyType"] == "CONSTRUCT_ON_OWN_LAND"
                        }
                    },
                    {
                        to: "landLocation",
                        guard: function(model, from) {
                            return model["propertyType"] == "PURCHASE_LAND_ONLY" || model["propertyType"] == "PURCHASE_LAND_AND_CONSTRUCT"
                        }
                    }                    
                ],
                default: "builder"
            }
        },
        {trigger: "next", from: "builder",                 to: "costOfProperty"},
        {trigger: "next", from: "costOfProperty",
            to: {
                choices: [
                    {
                        to: "existingLoanDetails",
                        guard: function(model, from) {
                            return model["purposeOfLoan"] == "TRANSFER_EXISTING_HOME_LOAN"
                        }
                    }
                ],
                default: "applyingWithCoApplicant"
            }
        },
        {trigger: "next", from: "landLocation",            to: "landTransactionType"},
        {trigger: "next", from: "landTransactionType",     to: "landSellerDetail"},
        {trigger: "next", from: "landSellerDetail",        to: "costOfLand"},
        {trigger: "next", from: "costOfLand",
            to: {
                choices: [
                    {
                        to: "costOfConstruction",
                        guard: function(model, from) {
                            return model["propertyType"] == "CONSTRUCT_ON_OWN_LAND" || model["propertyType"] == "PURCHASE_LAND_AND_CONSTRUCT"
                        }
                    },
                    {
                        to: "existingLoanDetails",
                        guard: function(model, from) {
                            return model["propertyType"] == "PURCHASE_LAND_ONLY" && model["purposeOfLoan"] == "TRANSFER_EXISTING_HOME_LOAN"
                        }
                    }
                ],
                default: "applyingWithCoApplicant"
            }
        },
        {trigger: "next", from: "costOfConstruction",
            to: {
                choices: [
                    {
                        to: "existingLoanDetails",
                        guard: function(model, from) {
                            return model["purposeOfLoan"] == "TRANSFER_EXISTING_HOME_LOAN"
                        }
                    }
                ],
                default: "applyingWithCoApplicant"
            }
        },
        {trigger: "next", from: "existingLoanDetails",     to: "existingLoanStartDate"},
        {trigger: "next", from: "existingLoanStartDate",   to: "applyingWithCoApplicant"},
        {trigger: "next", from: "applyingWithCoApplicant",
            to: {
                choices: [
                    {
                        to: "coApplicantRelationship",
                        guard: function(model, from) {
                            return model["applyingWithCoApplicant"] === true
                        }
                    }
                ],
                default: "contactMe"
            }
        },
        {trigger: "next", from: "coApplicantRelationship",            to: "coApplicantOwnershipSplit"},
        {trigger: "next", from: "coApplicantOwnershipSplit",          to: "coApplicantResidentCity"},
        {trigger: "next", from: "coApplicantResidentCity",            to: "coApplicantEmploymentType"},
        {trigger: "next", from: "coApplicantEmploymentType",
            to: {
                choices: [
                    {
                        to: "coApplicantEmployer",
                        guard: function(model, from) {
                            return model["coApplicantEmploymentType"] == "SALARIED" || model["coApplicantEmploymentType"] == "SALARIED_PROFESSIONAL"
                        }
                    },
                    {
                        to: "coApplicantLatestProfitAfterTax",
                        guard: function(model, from) {
                            return model["coApplicantEmploymentType"] == "SELF_EMPLOYED_BUSINESS" || model["coApplicantEmploymentType"] == "SELF_EMPLOYED_PROFESSIONAL"
                        }
                    }
                ],
                default: "dob"
            }
        },
        {trigger: "next", from: "coApplicantEmployer",                to: "coApplicantJoiningDate"},
        {trigger: "next", from: "coApplicantJoiningDate",             to: "coApplicantGrossMonthlyIncome"},
        {trigger: "next", from: "coApplicantGrossMonthlyIncome",      to: "coApplicantAnnualBonus"},
        {trigger: "next", from: "coApplicantAnnualBonus",             to: "coApplicantMonthlyIncentives"},
        {trigger: "next", from: "coApplicantMonthlyIncentives",       to: "coApplicantTotalEMI"},
        {trigger: "next", from: "coApplicantLatestProfitAfterTax",    to: "coApplicantTotalEMI"},
        {trigger: "next", from: "coApplicantTotalEMI",                to: "coApplicantDob"},
        {trigger: "next", from: "coApplicantDob",                     to: "contactMe"}
    ]
};
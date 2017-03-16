var slideManagerConfig = {
    firstSlide: 'residentCity',
    lastSlide: 'contactMe',
    slides: [
        {
            modelKey: 'residentCity',
            title: 'Where do you live currently?',
            componentName: 'City',
            properties: {
                variant: 'Resident' 
            }
        },
        {
            modelKey: "residencyStatus",
            title: "Residency status",
            componentName: 'ResidencyStatus'
        },
        {
            modelKey: 'gender',
            title: 'My gender',
            componentName: 'Gender'
        },
        {
            modelKey: 'propertyCity',
            title: 'City in which property is based',
            componentName: 'City',
            properties: {
                variant: 'Property' 
            }
        },
        {
            modelKey: 'employmentType',
            title: 'Type of employment',
            componentName: 'EmploymentType'
        },
        {
            modelKey: 'purposeOfLoan',
            title: 'How would you like to use your home loan?',
            componentName: 'HomeLoanPurpose'
        },
        {
            modelKey: 'coApplicantRelationship',
            title: 'Who is the co-applicant?',
            componentName: 'CoApplicantRelationship'
        },
        {
            modelKey: 'landTransactionType',
            title: 'Type of transaction',
            componentName: 'LandTransactionType'
        },
        {
            modelKey: 'landSellerDetail',
            title: 'Who is the seller?',
            componentName: 'LandSeller'
        },
        {
            modelKey: 'propertyLocation',
            title: 'Where is the land?',
            componentName: 'LandLocation'
        },
        {
            modelKey: 'propertyDetail',
            title: 'Tell us about your property',
            componentName: 'PropertyConstructionType'
        },
        {
            modelKey: 'employer',
            title: 'Company I work for',
            componentName: 'Employer'
        },
        {
            modelKey: 'joiningDate',
            title: 'Joining date with your current organisation',
            componentName: 'WorkExperience'
        },
        {
            modelKey: "existingLoanStartDate",
            title: "When did you begin your existing loan?",
            componentName: 'Calendar',
            properties: {
                variant: 'Last5Years'
            }
        },
        {
            modelKey: 'builder',
            title: 'Name of builder & project (optional)',
            componentName: 'Builder'
        },
        {
            modelKey: 'existingLoanDetails',
            title: 'Which bank is your existing home loan with?',
            componentName: 'ExistingLoanDetails'
        },
        {
            modelKey: 'applyingWithCoApplicant',
            title: 'How will the ownership be divided?',
            componentName: 'ApplyingWithCoApplicant'
        },
        {
            modelKey: 'coApplicantOwnershipSplit',
            title: 'Would you like to add a co-applicant?',
            componentName: 'CoApplicantOwnershipSplit'
        },
        {
            modelKey: 'grossMonthlyIncome',
            title: 'Gross fixed monthly income',
            componentName: 'Money',
            properties: {
                currencyCode: 'INR',
                min: 3000,
                max: 9999999,
                sliderMin: 0,
                sliderMax: 120000,
                sliderStep: 1000,
                purpose: 'Gross Monthly Income',
                tooltip: {
                    text: 'Enter your gross monthly salary as per his/her your monthly payslip before deductions. Include only direct deposit or cheque payments. Exclude payments in hard cash and in-kind components.'
                }
            }
        },
        {
            modelKey: 'annualBonus',
            title: 'Total annual bonus (optional)',
            componentName: 'Money',
            properties: {
                currencyCode: 'INR',
                min: 0,
                max: 9999999,
                sliderMax: function(model) {return 4 * model['grossMonthlyIncome']},
                purpose: 'Annual Bonus',
                tooltip: {
                    text: 'Enter your annual bonus, if any, excluding any cash component.'
                }
            }
        },
        {
            modelKey: 'monthlyIncentives',
            title: 'Average monthly incentives (optional)',
            componentName: 'Money',
            properties: {
                currencyCode: 'INR',
                min: 0,
                max: 9999999,
                sliderMax: function(model) {return 2 * model['grossMonthlyIncome']},
                purpose: 'Average Monthly Incentives',
                tooltip: {
                    text: 'Enter the approximate sum of all monthly incentives earned by you, if any. Include only direct deposit or cheque payments. Exclude payments in hard cash and in-kind components.'
                }
            }
        },
        {
            modelKey: 'latestProfitAfterTax',
            title: 'Latest year\'s profit after tax',
            componentName: 'Money',
            properties: {
                currencyCode: 'INR',
                min: 0,
                max: 9999999,
                sliderMin: 0,
                sliderMax: 3000000,
                sliderStep: 5000,
                purpose: 'Profit After Tax',
                tooltip: {
                    text: 'Enter profit after tax as per your latest year\'s ITR.'
                }
            }
        },
        {
            modelKey: 'totalEMI',
            title: 'Total EMIs you currently pay per month (if any)',
            componentName: 'Money',
            properties: {
                currencyCode: 'INR',
                min: 0,
                max: 9999999,
                sliderMin: 0,
                sliderMax:  function(model) {return 1.8 * model['latestProfitAfterTax']},
                sliderStep: 5000,
                purpose: 'EMI',
                tooltip: {
                    text: 'Enter the sum of all monthly payments by you on your currently ongoing loans.'
                }
            }
        },
        {
            modelKey: 'costOfLand',
            title: 'Cost of land',
            componentName: 'Money',
            properties: {
                currencyCode: 'INR',
                min: 0,
                max: 9999999,
                sliderMin: 400000,
                sliderMax: 14400000,
                sliderStep: 10000,
                purpose: 'Cost of land',
                tooltip: {
                    text: 'Enter value as per Sale Agreement or as per the Registered Sale Deed value, whichever is higher'
                }
            }
        },
        {
            modelKey: 'costOfProperty',
            title: 'Cost of home/flat',
            componentName: 'Money',
            properties: {
                currencyCode: 'INR',
                min: 0,
                max: 9999999,
                sliderMin: 400000,
                sliderMax: 14400000,
                sliderStep: 10000,
                purpose: 'Cost Of Property',
                tooltip: {
                    text: 'Include only the following components of cost:Basic Cost, car parking (if being sold),Firefighting charges,electricity/water charges,Electrification charges,Power Back Up,Internal Development Charges (IDC),External Development Charges (EDC),Preferential Location Charges (PLC),Interest Free Maintenance Security Deposit ( IFMS),Club Membership,VAT & Service Tax,Stamp duty and registration charges'
                }
            }
        },
        {
            modelKey: 'costOfConstruction',
            title: 'Cost of construction',
            componentName: 'Money',
            properties: {
                currencyCode: 'INR',
                min: 0,
                max: 9999999,
                sliderMin: 400000,
                sliderMax: 14400000,
                sliderStep: 10000,
                purpose: 'Cost of construction',
                tooltip: {
                    text: 'Enter the cost of construction as per the engineering estimate.'
                }
            }
        },
        {
            modelKey: "dob",
            title: "What's your age (years completed)?",
            componentName: 'Calendar',
            properties: {
                variant: 'DOB'
            }
        },
        {
            modelKey: "contactMe",
            title: "Need to talk? Leave your number, if you'd like to hear from us.",
            componentName: 'ContactMe'
        }
    ],
    transitions: [
        {name: 'next', from: "residentCity",            to: "gender"},
        {name: 'next', from: "gender",                  to: "propertyCity"},
        {name: 'next', from: "propertyCity",            to: "employmentType"},
        {name: 'next', from: "employmentType",
            to: [
                {to: "employer", if: function(model, from) {return model['employmentType'] == 'SALARIED' || model['employmentType'] == 'SALARIED_PROFESSIONAL'}},
                {to: "latestProfitAfterTax", if: function(model, from) {return model['employmentType'] == 'SELF_EMPLOYED_BUSINESS' || model['employmentType'] == 'SELF_EMPLOYED_PROFESSIONAL'}},
                {to: "dob", if: function(model, from) {return model['employmentType'] == 'STUDENT' || model['employmentType'] == 'RETIRED' || model['employmentType'] == 'HOMEMAKER'}}
            ]
        },
        {name: 'next', from: "employer",                to: "joiningDate"},
        {name: 'next', from: 'joiningDate',             to: 'grossMonthlyIncome'},
        {name: 'next', from: 'grossMonthlyIncome',      to: 'annualBonus'},
        {name: 'next', from: 'annualBonus',             to: 'monthlyIncentives'},
        {name: 'next', from: 'monthlyIncentives',       to: 'totalEMI'},
        {name: 'next', from: "latestProfitAfterTax",    to: "totalEMI"},
        {name: 'next', from: "totalEMI",                to: "dob"},
        {name: 'next', from: 'dob',                     to: 'purposeOfLoan'},
        {name: 'next', from: "purposeOfLoan",
            to: [
                {to: "propertyDetail", if: function(model, from) {return model['purposeOfLoan'] == 'PURCHASE_IDENTIFIED_PROPERTY' || model['purposeOfLoan'] == 'TRANSFER_EXISTING_HOME_LOAN'}},
                {to: "applyingWithCoApplicant", if: function(model, from) {return model['purposeOfLoan'] == 'PURCHASE_NOT_YET_IDENTIFIED_PROPERTY'}}
            ]
        },
        {name: 'next', from: "propertyDetail",
            to: [
                {to: "builder", if: function(model, from) {return model['propertyDetail'] == 'CONSTRUCTED' || model['propertyDetail'] == 'UNDER_CONSTRUCTION'}},
                {to: "propertyLocation", if: function(model, from) {return model['propertyDetail'] == 'PURCHASE_LAND' ||  model['propertyDetail'] == 'PURCHASE_LAND_AND_CONSTRUCT'}},
                {to: "costOfLand", if: function(model, from) {return model['propertyDetail'] == 'CONSTRUCT_ON_OWN_LAND'}}
            ]
        },
        {name: 'next', from: "builder",                 to: "costOfProperty"},
        {name: 'next', from: "costOfProperty",
            to: [
                {to: "existingLoanDetails", if: function(model, from) {return model['purposeOfLoan'] == 'TRANSFER_EXISTING_HOME_LOAN'}},
                {to: "applyingWithCoApplicant", if: function(model, from) {return model['purposeOfLoan'] != 'TRANSFER_EXISTING_HOME_LOAN'}}
            ]
        },
        {name: 'next', from: "propertyLocation",        to: "landTransactionType"},
        {name: 'next', from: "landTransactionType",     to: "landSellerDetail"},
        {name: 'next', from: "landSellerDetail",        to: "costOfLand"},
        {name: 'next', from: "costOfLand",
            to: [
                {to: "costOfConstruction", if: function(model, from) {return model['propertyDetail'] != 'PURCHASE_LAND'}},
                {to: "applyingWithCoApplicant", if: function(model, from) {return model['propertyDetail'] == 'PURCHASE_LAND'}}
            ]
        },
        {name: 'next', from: "costOfConstruction",      to: "applyingWithCoApplicant"},
        {name: 'next', from: "existingLoanDetails",     to: "existingLoanStartDate"},
        {name: 'next', from: "existingLoanStartDate",   to: "applyingWithCoApplicant"},
        {name: 'next', from: "applyingWithCoApplicant",
            to: [
                {to: "coApplicantRelationship", if: function(model, from) {return model['applyingWithCoApplicant'] == true}},
                {to: "contactMe", if: function(model, from) {return model['applyingWithCoApplicant'] == 'false'}}
            ]
        },
        {name: 'next', from: "coApplicantRelationship", to: "coApplicantOwnershipSplit"}
    ]
};
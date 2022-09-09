export const ROUTES = {
    AUTH: 'Auth',
    CASE: 'Case',
    COSTUMERTYPE: 'Costumertype',
    DEPARTMENT: 'Department',
    FILE: 'File',
    PATIENT: 'Patient',
    PATIENTTYPE: 'Patienttype',
    ROLE: 'Roles',
    STATION: 'Station',
    STOCK: 'Stock',
    UNIT: 'Unit',
    USER: 'Users',
    DEACTIVESTOCK: 'Deactivestock',
    STOCKMOVEMENT: 'Stockmovement',
    ACTIVESTOCK: 'Activestock',
    DATATABLE: 'Datatable',
    ACTIVEPATIENT: 'Activepatient',
    PATIENTREPORT: 'Patientreport'
}

export const MOVEMENTTYPES = [
    { value: 0, label: "Oluşturma", timelineclass: "timeline-wrapper-success" },
    { value: 1, label: "Ekleme", timelineclass: "timeline-wrapper-success" },
    { value: 2, label: "Tüketim", timelineclass: "timeline-wrapper-danger" },
    { value: 3, label: "Güncelleme", timelineclass: "timeline-wrapper-success" },
    { value: 4, label: "Transfer", timelineclass: "timeline-wrapper-success" },
    { value: 5, label: "İtlaf Edilme", timelineclass: "timeline-wrapper-warning" },
    { value: 6, label: "Silinme", timelineclass: "timeline-wrapper-warning" }
]

export const COLUMNTYPES = {
    NUMBER: 1,
    TEXT: 2,
    DATE: 3
}

export const MARIALSTATUS = [
    { label: "EVLİ", value: "EVLİ" },
    { label: "BEKAR", value: "BEKAR" }
]
export const BIOLOGICALAFFINITY = [
    { label: "ÖZ", value: "ÖZ" },
    { label: "ÜVEY", value: "ÜVEY" }
]
export const GENDER = [
    { label: 'ERKEK', value: 'ERKEK' },
    { label: 'KADIN', value: 'KADIN' }
]

export const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isFocused ? "#8e8d8d" : null,
        };
    }
};
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
    ACTIVEPATIENT : 'Activepatient',
    PATIENTREPORT : 'Patientreport'
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

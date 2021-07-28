const sql = require("mssql")
// const sql = require('mssql/msnodesqlv8');
const config = require("./config");

sql.on("error", err => {
    console.log(err.message);
})

var Query2 = 
    `SELECT id = ROW_NUMBER() OVER (ORDER BY e.Name), e.Name, e.EmployeeCode
        , sum(case when YEAR(tlla.DateIssued) = YEAR( getDate() ) AND tlla.LeaveType = 'AL' AND tlla.Approved = '1' then Days else 0 end) as Annual_Leaves
        , sum(case when YEAR(tlla.DateIssued) = YEAR( getDate() ) AND tlla.LeaveType = 'MC' AND tlla.Approved = '1' then Days else 0 end) as Medical_Leaves
        , sum(case when YEAR(tlla.DateIssued) = YEAR( getDate() ) AND tlla.LeaveType = 'ALB' AND tlla.Approved = '1' then Days else 0 end) as Balance_Leave
        , sum(case when YEAR(tlla.DateIssued) = YEAR( getDate() ) AND tlla.LeaveType = 'NPL' AND tlla.Approved = '1' then Days else 0 end) as No_Pay_Leave
        , sum(case when YEAR(tlla.DateIssued) = YEAR( getDate() ) AND tlla.Approved = '0' then Days else 0 end) as Not_Yet_Approved
        , max(case when telt.LeaveType = 'AL' then telt.DaysEntitle else 0 end) as Annual_Leaves_Entitled
        , max(case when telt.LeaveType = 'MC' then telt.DaysEntitle else 0 end) as Medical_Leaves_Entitled
    FROM tblEmployee e
    LEFT JOIN tblLongLeaveApplication tlla on e.EmployeeCode = tlla.EmployeeCode   
    LEFT JOIN tblEmployeeLeaveType telt on e.EmployeeCode = telt.EmployeeCode
    GROUP BY e.EmployeeCode, e.name
    `

var Query = 
`SELECT id = ROW_NUMBER() OVER (ORDER BY tlla.DateFrom Desc), e.Name, e.EmployeeCode, tlla.Days, tlla.Approved, tlla.LeaveType, CONVERT(varchar, tlla.DateFrom, 101) AS DateFrom, CONVERT(varchar, tlla.DateTo, 101) AS DateTo, CONVERT(varchar, tlla.DateEntry, 22) AS DateEntry, tlla.Approved, tlla.ApplicationNo
FROM tblEmployee e
LEFT JOIN tblLongLeaveApplication tlla on e.EmployeeCode = tlla.EmployeeCode   
WHERE e.EmployeeCode = @input_parameter AND (YEAR(tlla.DateIssued) BETWEEN YEAR( getDate() ) -1 AND YEAR( getDate() )) 
`

var QueryMax = 
`SELECT max(KeyID) + 1 AS KeyID, max(ApplicationNo) + 1 AS ApplicationNo
FROM tblLongLeaveApplication tlla
`

var InsertLeaveQuery =
`
SET IDENTITY_INSERT tblLongLeaveApplication ON
INSERT INTO tblLongLeaveApplication (Branch, EmployeeCode, LeaveType, DateFrom, DateTo, DateIssued, Days, KeyID, DateEntry, DateModify, UserID, Approved, ApplicationNo)
VALUES (@Branch, @EmployeeCode, @LeaveType, @DateFrom, @DateTo, @DateIssued, @Days, @KeyID, @DateEntry, @DateModify, @UserID, @Approved, @ApplicationNo);
`

async function getDBUsers() {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query(Query2);
        return users.recordsets;
    } catch (error) {
        console.log(error + "dboperations");
    }
}


async function getDBUser(EmployeeCode) {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request()
        .input("input_parameter", sql.VarChar, EmployeeCode)
        .query(Query);
        return users.recordsets;
    } catch (error) {
        console.log(error + "dboperations");
    }
}

async function getApplicationNo() {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query(QueryMax);
        return users.recordsets;
    } catch (error) {
        console.log(error + "dboperations");
    }
}

async function addLeave(appliedLeave) {
    try {
        let pool = await sql.connect(config);
        let insertLeave = await pool.request()
            .input("Branch", sql.VarChar, appliedLeave.Branch)
            .input("EmployeeCode", sql.VarChar, appliedLeave.EmployeeCode)
            .input("LeaveType", sql.VarChar, appliedLeave.LeaveType)
            .input("DateFrom", sql.DateTime, appliedLeave.DateFrom)
            .input("DateTo", sql.DateTime, appliedLeave.DateTo)
            .input("DateIssued", sql.DateTime, new Date(appliedLeave.DateFrom))
            .input("Days", sql.VarChar, appliedLeave.Days)
            .input("KeyID", sql.VarChar, appliedLeave.KeyID)
            .input("DateEntry", sql.DateTime, appliedLeave.DateEntry)
            .input("DateModify", sql.DateTime, appliedLeave.DateModify)
            .input("UserID", sql.VarChar, appliedLeave.UserID)
            .input("Approved", sql.Bit, 0)
            .input("ApplicationNo", sql.VarChar, appliedLeave.ApplicationNo)
            .query(InsertLeaveQuery)
        return insertLeave.recordsets;
    } catch (error) {
        console.log(error + "dboperations");
    }
}

module.exports = {
    getUsers: getDBUsers,
    getUser: getDBUser,
    getNumber: getApplicationNo,
    addLeave: addLeave
}
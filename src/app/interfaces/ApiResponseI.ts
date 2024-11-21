interface ApiResponse{
    affectedRows: number,
    changedRows: number,
    fieldCount: number,
    insertId: number,
    message: string,
    protocol41: boolean,
    serverStatus: number,
    warningCount: number,
}

export default ApiResponse;
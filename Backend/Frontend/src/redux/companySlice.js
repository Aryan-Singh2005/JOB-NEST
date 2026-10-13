import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: {},
        companies: [],
        searchCompanyByText: "",
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        searchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        },
    },
});

// Export the actions

export const { setSingleCompany, setCompanies, searchCompanyByText } = companySlice.actions;

// Export the reducer
export default companySlice.reducer;

// Export the companySlice if needed
export { companySlice };

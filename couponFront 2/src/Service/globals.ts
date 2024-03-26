class Globals {
}

class DevelopmentGlobals extends Globals {

    public theHost = "localhost";
    public thePort = "8080";

    public urls = {

        addCompany: "http://localhost:8080/guest/addCompany",
        updateCompany: "http://localhost:8080/Lirons/admin/updateCompany",
        deleteCompany: "http://localhost:8080/Lirons/admin/deleteCompany/",
        getOneCompany: "http://localhost:8080/Lirons/admin/oneCompany/{id}",
        getAllCompanies: "http://localhost:8080/Lirons/admin/allCompanies",

        addCustomer: "http://localhost:8080/guest/addCustomer",
        updateCustomer: "http://localhost:8080/Lirons/admin/updateCustomer",
        deleteCustomer: "http://localhost:8080/Lirons/admin/deleteCustomer/",
        getOneCustomer: "http://localhost:8080/Lirons/admin/oneCustomer/{id}",
        getAllCustomers: "http://localhost:8080/Lirons/admin/allCustomers",
        

        addCompanyCoupon: "http://localhost:8080/Lirons/company/addCoupon",
        updateCompanyCoupon: "http://localhost:8080/Lirons/company/updateCoupon",
        deleteCompanyCoupon: "http://localhost:8080/Lirons/company/delete",
        getAllCompaniesCoupons: "http://localhost:8080/Lirons/company/getAllCoupons",
        getAllCompanyCouponsByCategory: "http://localhost:8080/Lirons/company/getCouponsByCategory/",
        getAllCompanyCouponsUnderMaxPrice: "http://localhost:8080/Lirons/company/getCouponsByMaxPrice/{maxPrice}",
        getCompanyDetails: "http://localhost:8080/Lirons/company/companyDetails",

        purchaseCoupon: "http://localhost:8080/Lirons/customer/purchaseCoupon/",
        getAllCustomerCoupons: "http://localhost:8080/Lirons/customer/getAllCustomersCoupons",
        getAllCustomerCouponsByCategory: "http://localhost:8080/Lirons/customer/getCouponsByCategory/{category}",
        getAllCustomerCouponsUnderMaxPrice: "http://localhost:8080/Lirons/customer/getCouponsByMaxPrice/{maxPrice}",
        getCustomerDetails: "http://localhost:8080/Lirons/customer/customerDetails",
        customerAllCoupons: "http://localhost:8080/Lirons/customer/coupons",

        getAllCoupons: "http://localhost:8080/guest/coupons",
        register: "http://localhost:8080/register",
        login: "http://localhost:8080/login"

    };
}

class ProductionGlobals extends Globals {
    public urls = {

        addCompany: "https://couponexpress.herokuapp.com/admin/addCompany",
        updateCompany: "https://couponexpress.herokuapp.com/admin/updateCompany",
        deleteCompany: "https://couponexpress.herokuapp.com/admin/deleteCompany/",
        getOneCompany: "https://couponexpress.herokuapp.com/admin/getOneCompany/",
        getAllCompanies: "https://couponexpress.herokuapp.com/admin/getAllCompanies",

        addCustomer: "https://couponexpress.herokuapp.com/admin/addCustomer",
        updateCustomer: "https://couponexpress.herokuapp.com/admin/updateCustomer",
        deleteCustomer: "https://couponexpress.herokuapp.com/admin/deleteCustomer/",
        getOneCustomer: "https://couponexpress.herokuapp.com/admin/getOneCustomer/",
        getAllCustomers: "https://couponexpress.herokuapp.com/admin/getAllCustomers",

        addCompanyCoupon: "https://couponexpress.herokuapp.com/company/addCompanyCoupon/",
        updateCompanyCoupon: "https://couponexpress.herokuapp.com/company/updateCompanyCoupon",
        deleteCompanyCoupon: "https://couponexpress.herokuapp.com/company/deleteCompanyCoupon/",
        getAllCompaniesCoupons: "https://couponexpress.herokuapp.com/company/getAllCompaniesCoupons",
        getAllCompanyCouponsByCategory: "https://couponexpress.herokuapp.com/company/getAllCouponsByCategory/",
        getAllCompanyCouponsUnderMaxPrice: "https://couponexpress.herokuapp.com/company/getAllCouponsUnderMaxPrice/",
        getCompanyDetails: "https://couponexpress.herokuapp.com/company/getCompanyDetails",

        purchaseCoupon: "https://couponexpress.herokuapp.com/customer/purchaseCoupon",
        getAllCoupons: "https://couponexpress.herokuapp.com/customer/getAllCoupons",
        getAllCustomerCoupons: "https://couponexpress.herokuapp.com/customer/getAllCustomerCoupons",
        getAllAvailableForPurchase: "https://couponexpress.herokuapp.com/customer/getAllCoupons",
        getAllCustomerCouponsByCategory: "https://couponexpress.herokuapp.com/customer/getAllCouponsByCategory/",
        getAllCustomerCouponsUnderMaxPrice: "https://couponexpress.herokuapp.com/customer/getAllCouponsUnderMaxPrice/",
        getCustomerDetails: "https://couponexpress.herokuapp.com/customer/getCustomerDetails",

        register: "https://couponexpress.herokuapp.com/register",
        login: "https://couponexpress.herokuapp.com/login",

        layout: "https://couponexpress.herokuapp.com/layout",
        home: "https://couponexpress.herokuapp.com"

    };
}

const globals = process.env.NODE_ENV === "development" ? new DevelopmentGlobals() : new ProductionGlobals();

export default globals;
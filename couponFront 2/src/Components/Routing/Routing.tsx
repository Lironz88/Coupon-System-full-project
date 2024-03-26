import "./Routing.css";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import Page404 from "../AuthArea/Page404/Page404";
import AdminArea from "../AdminArea/AdminArea";
import CompanyArea from "../CompanyArea/CompanyArea";
import CustomerArea from "../CustomerArea/CustomerArea";
import GetAllCompanies from "../AdminArea/Company/GetAllCompanies/GetAllCompanies";
import GetAllCustomers from "../AdminArea/Customer/GetAllCustomers/GetAllCustomers";
import AddCompany from "../AdminArea/Company/AddCompany/AddCompany";
import AddCustomer from "../AdminArea/Customer/AddCustomer/AddCustomer";
import UpdateCompany from "../AdminArea/Company/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../AdminArea/Customer/UpdateCustomer/UpdateCustomer";
import Login from "../AuthArea/Login/Login";
import RegisterButton from "../AuthArea/RegisterButton/RegisterButton";
import AllCoupons from "../CustomerArea/AllCoupons/AllCoupons";
import GetCustomerCoupons from "../CustomerArea/GetCustomerCoupons/GetCustomerCoupons";
import GetCustomersDetails from "../CustomerArea/GetCustomersDetails/GetCustomersDetails";
import GetCustomerCouponsByPrice from "../CustomerArea/GetCustomersCouponsByPrice/GetCustomersCouponsByPrice";
import GetCustomerCouponsByCategory from "../CustomerArea/GetCustomersCouponsByCategory/GetCustomersCouponsByCategory";
import AddCoupon from "../CompanyArea/AddCoupon/AddCoupon";
import GetCompanyDetails from "../CompanyArea/GetCompanyDetails/GetCompanyDetails";
import GetAllCompanyCoupons from "../CompanyArea/GetAllCompanyCoupons/GetAllCompanyCoupons";
import GetCouponByCategory from "../CompanyArea/GetCouponsByCategory/GetCouponsByCategory";
import GetCouponsByMaxPrice from "../CompanyArea/GetCouponsByMaxPrice/GetCouponsByMaxPrice";
import UpdateCoupon from "../CompanyArea/UpdateCoupon/UpdateCoupon";



function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>

                <Route path="/coupons" element={<AllCoupons/>}/>
                <Route path="*" element={<Page404/>}/>
                <Route index element={<AllCoupons/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/register" element={<RegisterButton/>}/>
                <Route path="/guest/addCompany" element={<AddCompany/>}/>
                <Route path="/guest/addCustomer" element={<AddCustomer/>}/>
                <Route path="/guest/coupons" element={<AllCoupons/>}/>
                <Route path="/"/>

                <Route path="/admin/adminMainPage" element={<AdminArea/>}/>
                <Route path="/Lirons/admin/allCompanies" element={<GetAllCompanies/>}/>
                <Route path="/Lirons/admin/allCustomers" element={<GetAllCustomers/>}/>
                <Route path="/Lirons/admin/addCompany" element={<AddCompany/>}/>
                <Route path="/Lirons/admin/addCustomer" element={<AddCustomer/>}/>
                <Route path="/Lirons/admin/updateCompany" element={<UpdateCompany/>}/>
                <Route path="/Lirons/admin/updateCustomer" element={<UpdateCustomer/>}/>

                <Route path="/company/companyMainPage" element={<CompanyArea/>}/>
                <Route path="/Lirons/company/addCoupon" element={<AddCoupon/>}/>
                <Route path="/Lirons/company/companyDetails" element={<GetCompanyDetails/>}/>
                <Route path="/Lirons/company/getAllCoupons" element={<GetAllCompanyCoupons/>}/>
                <Route path="/Lirons/company/getCouponsByCategory/{category}" element={<GetCouponByCategory/>}/>
                <Route path="/Lirons/company/getCouponsByMaxPrice/{maxPrice}" element={<GetCouponsByMaxPrice/>}/>
                <Route path="/Lirons/company/updateCoupon" element={<UpdateCoupon/>}/>

                <Route path="/customer/customerMainPage" element={<CustomerArea/>}/>
                <Route path="/Lirons/customer/getAllCustomersCoupons" element={<GetCustomerCoupons/>}/>
                <Route path="/Lirons/customer/customerDetails" element={<GetCustomersDetails/>}/>
                <Route path="/Lirons/customer/getCouponsByMaxPrice/{maxPrice}" element={<GetCustomerCouponsByPrice/>}/>
                <Route path="/Lirons/customer/getCouponsByCategory/{category}" element={<GetCustomerCouponsByCategory/>}/>
            </Routes>
        </div>  
    );
}

export default Routing;

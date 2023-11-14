//styles
import global from '@/styles/global.module.scss'
import CustomersList from "@/components/CustomersList/CustomersList";
import CreateCustomerForm from "@/components/CreateCustomerForm/CreateCustomerForm";
import CentralModal from "@/components/CentralModal/CentralModal";
import FormWrapper from "@/components/CreateCustomerForm/FormWrappet";


export default function Home() {
  return (
      <>
          <h1 className={global.pageTitle}>Homework 1 by Kiselevych Anton</h1>
          <FormWrapper/>
          <CustomersList/>
      </>
  )
}

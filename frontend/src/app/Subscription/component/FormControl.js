// import StepFive from '@/StepFive'
import RentOptions from './RentOptions'

import LastStep from './LastStep'
import InfoAccommodation from './InfoAccommodation'
import SubscriptionPriceList from './SubscriptionPriceList'
import ProformaTemplate from './ProformaTemplate'
  
import React, { useState } from 'react'


const FormControle = () => {
  const [tab, setTab]= useState(0)
  const [rentalOption, setRentalOption] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedWeb, setSelectedWeb] = useState(null);



  if (tab===0) return <RentOptions setTab={setTab}  setRentalOption={setRentalOption} rentalOption={rentalOption}/>
  if (tab===1) return <SubscriptionPriceList setTab={setTab}  selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan}/>
  if (tab===2) return <InfoAccommodation setTab={setTab}  selectedWeb={selectedWeb} setSelectedWeb={setSelectedWeb}/>
  if (tab===3) return <LastStep setTab={setTab} />
  if (tab===4) return <ProformaTemplate setTab={setTab}  />
  return null;
}

export default FormControle
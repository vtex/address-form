import React, { useEffect, useState } from 'react'

import styles from './ContactInfoForm.module.css'

const Input = ({
  id,
  label,
  type = 'text',
  value = '',
  name = '',
  onChange = (_) => {},
  placeholder = 'Optional',
  error = '',
}) => (
  <p className={`${id} input text ${error && 'error'}`}>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      autoComplete="on"
      type={type}
      className={`${error && 'error'} input-large`}
      placeholder={placeholder ?? ''}
      value={value ?? ''}
      name={name ?? id}
      onChange={(e) => onChange(e)}
    />
    {error ? <span className="help error">This field is required.</span> : null}
  </p>
)

let gguid = 1

function getGGUID(prefix = 0) {
  return `${prefix}${(gguid++ * new Date().getTime() * -1)
    .toString()
    .replace('-', '')}`
}

const ContactInfoForm = ({
  address,
  onChangeAddress,
  contactInfo = {},
  onChangeContactInfo = (_, __) => {},
  clientProfileData,
  prevContactInfo,
  canEditData,
}) => {
  const isPrevUserData = areEqual(prevContactInfo, clientProfileData)
  const [useUserInfo, setUseUserInfo] = useState(
    prevContactInfo?.id
      ? address?.contactId?.value === prevContactInfo?.id &&
          isPrevUserData &&
          canEditData
      : canEditData
  )

  const [localUserInfo, setLocalUserInfo] = useState(
    prevContactInfo && !isPrevUserData
      ? prevContactInfo
      : {
          email: null,
          firstName: '',
          lastName: '',
          document: null,
          phone: '',
          documentType: null,
        }
  )

  useEffect(() => {
    if (address?.contactId?.value && contactInfo?.id) {
      return
    }

    if (!address?.contactId?.value) {
      address.contactId.value = prevContactInfo?.id ?? getGGUID(1234)
    }

    onChangeContactInfo({ id: address.contactId.value })
    onChangeAddress(address)
  }, [
    address,
    onChangeAddress,
    onChangeContactInfo,
    prevContactInfo,
    contactInfo,
  ])

  useEffect(() => {
    if (useUserInfo) {
      onChangeContactInfo({
        id: address?.contactId?.value ?? '',
        email: '',
        firstName: clientProfileData?.firstName ?? '',
        lastName: clientProfileData?.lastName ?? '',
        document: '',
        phone: clientProfileData?.phone ?? '',
        documentType: '',
      })
    } else if (!isUserInfoEmpty(localUserInfo)) {
      onChangeContactInfo(localUserInfo)
    }

    onChangeAddress(address)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    useUserInfo,
    localUserInfo,
    onChangeContactInfo,
    clientProfileData,
    onChangeAddress,
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setLocalUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleResetUserData = (resetData) => {
    if (resetData) {
      onChangeContactInfo(localUserInfo)
    }
  }

  return (
    <div className={styles.mainContactInfoContainer}>
      <label className={styles.contactInfoCheckbox}>
        <input
          type="checkbox"
          checked={useUserInfo}
          style={{ display: 'block' }}
          onChange={() =>
            setUseUserInfo((prev) => {
              handleResetUserData(prev)

              return !prev
            })
          }
          disabled={!canEditData}
        />
        Receiver Information same as contact Information
      </label>
      {!useUserInfo ? (
        <div className={styles.mainContactInfoForm}>
          <h4 className={styles.contactInfoTitle}>Receiver Information</h4>
          <div>
            <div className={styles.contactInfoFlex}>
              <Input
                id="custom-contact-information-first-name"
                label="Receiver first name *"
                name="firstName"
                onChange={handleInputChange}
                value={localUserInfo.firstName ?? ''}
                placeholder="Required"
                error={contactInfo?.error?.firstName}
              />
              <Input
                id="custom-contact-information-last-name"
                label="Receiver last name *"
                name="lastName"
                onChange={handleInputChange}
                value={localUserInfo.lastName ?? ''}
                placeholder="Required"
                error={contactInfo?.error?.lastName}
              />
            </div>
            <Input
              id="custom-contact-information-phone"
              label="Receiver phone *"
              type="tel"
              name="phone"
              onChange={handleInputChange}
              value={localUserInfo.phone ?? ''}
              placeholder="Required"
              error={contactInfo?.error?.phone}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

const isUserInfoEmpty = (userInfo) => {
  for (const key in userInfo) {
    if (key !== 'id' && key !== 'error' && userInfo[key]) {
      return false
    }
  }

  return true
}

const areEqual = (obj1, obj2) => {
  if (obj1 === obj2) {
    return true
  }

  if (!obj1 || !obj2) {
    return false
  }

  for (const key in obj1) {
    if (key !== 'id' && key !== 'error') {
      if (obj1[key] && obj1[key] !== obj2[key]) {
        return false
      }
    }
  }

  return true
}

export const isContactInfoFormValid = (
  contactInfo,
  onChangeContactInfo,
  address
) => {
  const { contactId } = address ?? {}

  const { firstName, lastName, phone, id } = contactInfo

  if (!contactId?.value && !id) {
    return true
  }

  if (firstName) {
    if (lastName) {
      if (phone) {
        return true
      }

      onChangeContactInfo({
        error: { phone: 'Required' },
      })

      return false
    }

    onChangeContactInfo({
      error: { lastName: 'Required' },
    })

    return false
  }

  onChangeContactInfo({
    error: { firstName: 'Required' },
  })

  return false
}

export const getPreviousContactInfo = (state) => {
  const { orderForm: OFState, addressForm } = state
  const browseOF = vtexjs?.checkout?.orderForm

  const orderForm = browseOF ?? OFState?.orderForm

  let contactId =
    orderForm?.shippingData?.contactInformation?.find(
      ({ id }) =>
        addressForm?.addresses?.[addressForm?.residentialId]?.contactId
          ?.value === id
    ) ?? null

  if (!contactId) {
    contactId =
      orderForm?.shippingData?.contactInformation?.find(
        ({ id }) =>
          orderForm?.shippingData?.availableAddresses?.find(
            ({ addressId }) => addressId === addressForm?.residentialId
          )?.contactId === id
      ) ?? null
  }

  return contactId
}

export default ContactInfoForm

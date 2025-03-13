import React from 'react'
import Button from '@components/Button'
import { MdNavigateBefore } from 'react-icons/md'
import { IoCheckmarkOutline } from 'react-icons/io5'
import { Link } from 'react-router'


function AuthFailed() {
  return (
    <>
    <div className=" flex flex-col gap-2 items-center text-center">
        <h1 className="text-3xl text-primary font-bold">ALGO SALIO MAL...</h1>
        <h2 className="text-2xl text-secondary-text font-light">
          No eres tu? contacta el soporte tecnico de pagui
        </h2>
      </div>
      <div className="flex w-full justify-between items-center">
        <Link to={"/didit"}>
          <Button variant={"rounded"} size={"roundLg"}>
            <MdNavigateBefore className="w-8 h-8" />
          </Button>
        </Link>
        <Link to={"https://pagui.co/"} target="_blank">
          <Button variant={"underline"}>SOPORTE TECNICO</Button>
        </Link>
        <Link to={"/"}>
          <Button variant={"rounded"} size={"roundLg"}>
            <IoCheckmarkOutline className="w-8 h-8" />
          </Button>
        </Link>
      </div>
    </>
  )
}

export default AuthFailed
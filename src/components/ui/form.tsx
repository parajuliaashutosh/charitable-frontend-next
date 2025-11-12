export const FormLabel = ({
  className,
  children,
  required,
}: {
  className?: string
  children?: any
  required?: boolean
}) => {
  return (
    <p className={` ${className} pb-1 text-[14px]`}>
      {children}
      <small className={`${required ? 'inline-flex' : 'hidden'} text-destructive`}>&nbsp;*</small>
    </p>
  )
}

export const FormError = ({ error }: { error: string | undefined }) => {
  return <p className='text-destructive text-[12px] pt-1'>{error}</p>
}

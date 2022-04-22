import React, { ReactNode } from "react";

const colors:{} = {
    gold: '#BC8C3E',
    white: '#ffffff',
    gray: '#757575',
    lightgray: '#E5E5E5',
    black: '#000000',
}

export const cart = (size:number=20, color:string="white"):ReactNode => <svg width={size} height={size / 1.25} viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 1H19L17.5 10H5.5L4 1Z" stroke={colors[color as keyof {}]} strokeLinecap="square"/>
    <path d="M7 15C7.55228 15 8 14.5523 8 14C8 13.4477 7.55228 13 7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15Z" stroke={colors[color as keyof {}]} strokeLinecap="square"/>
    <path d="M16 15C16.5523 15 17 14.5523 17 14C17 13.4477 16.5523 13 16 13C15.4477 13 15 13.4477 15 14C15 14.5523 15.4477 15 16 15Z" stroke={colors[color as keyof {}]} strokeLinecap="square"/>
    <path d="M4 1H1" stroke={colors[color as keyof {}]} strokeLinecap="square"/>
</svg>

export const returns = (size:number=20, color:string="white"):ReactNode => <svg width={size} height={size} viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.225 11.0553L21 16.5276L15.225 22L13.5753 20.4368L16.534 17.6321L1.16667 17.6332V15.4221H16.534L13.5753 12.6185L15.225 11.0553ZM5.775 0L7.42467 1.56322L4.466 4.36683H19.8333V6.57789H4.466L7.42467 9.38151L5.775 10.9447L0 5.47236L5.775 0Z" fill={colors[color as keyof {}]} />
</svg>

export const shipping = (size:number=20, color:string="white"):ReactNode => <svg width={size} height={size/1.33} viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.68909 14.6193C8.5594 15.5575 8.10569 16.416 7.41129 17.037C6.71688 17.6581 5.82842 18 4.90909 18C3.98976 18 3.1013 17.6581 2.4069 17.037C1.71249 16.416 1.25878 15.5575 1.12909 14.6193H0V1.12456C0 0.826308 0.114935 0.540272 0.31952 0.329376C0.524105 0.11848 0.801582 0 1.09091 0H16.3636C16.653 0 16.9304 0.11848 17.135 0.329376C17.3396 0.540272 17.4545 0.826308 17.4545 1.12456V3.37368H20.7273L24 7.93489V14.6193H21.78C21.6503 15.5575 21.1966 16.416 20.5022 17.037C19.8078 17.6581 18.9193 18 18 18C17.0807 18 16.1922 17.6581 15.4978 17.037C14.8034 16.416 14.3497 15.5575 14.22 14.6193H8.68909ZM15.2727 2.24912H2.18182V11.3018C2.61225 10.8488 3.14247 10.5098 3.72737 10.3135C4.31226 10.1172 4.9345 10.0694 5.54114 10.1743C6.14778 10.2792 6.72084 10.5337 7.21157 10.916C7.7023 11.2983 8.09616 11.7972 8.35964 12.3702H14.5495C14.7327 11.9732 14.9782 11.6122 15.2727 11.3018V2.24912ZM17.4545 8.99648H21.8182V8.67598L19.6276 5.6228H17.4545V8.99648ZM18 15.7438C18.4341 15.7438 18.8505 15.5661 19.1575 15.2496C19.4645 14.9332 19.6369 14.504 19.6369 14.0564C19.6369 13.6089 19.4645 13.1797 19.1575 12.8633C18.8505 12.5468 18.4341 12.369 18 12.369C17.5659 12.369 17.1495 12.5468 16.8425 12.8633C16.5356 13.1797 16.3631 13.6089 16.3631 14.0564C16.3631 14.504 16.5356 14.9332 16.8425 15.2496C17.1495 15.5661 17.5659 15.7438 18 15.7438ZM6.54545 14.057C6.54545 13.8355 6.50313 13.6161 6.42089 13.4115C6.33866 13.2068 6.21813 13.0209 6.06617 12.8642C5.91422 12.7076 5.73383 12.5833 5.5353 12.4986C5.33677 12.4138 5.12398 12.3702 4.90909 12.3702C4.6942 12.3702 4.48141 12.4138 4.28288 12.4986C4.08435 12.5833 3.90396 12.7076 3.75201 12.8642C3.60006 13.0209 3.47952 13.2068 3.39729 13.4115C3.31505 13.6161 3.27273 13.8355 3.27273 14.057C3.27273 14.5044 3.44513 14.9334 3.75201 15.2498C4.05888 15.5661 4.4751 15.7438 4.90909 15.7438C5.34308 15.7438 5.7593 15.5661 6.06617 15.2498C6.37305 14.9334 6.54545 14.5044 6.54545 14.057Z" fill={colors[color as keyof {}]}/>
</svg>

export const safePurchase = (size:number=20, color:string="white"):ReactNode => <svg width={size} height={size} viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.8421 0L16.9083 2.508C17.1333 2.5779 17.3299 2.71753 17.4695 2.90652C17.6091 3.0955 17.6843 3.32395 17.6842 3.5585V5.5H19.8947C20.1879 5.5 20.469 5.61589 20.6763 5.82218C20.8836 6.02847 21 6.30826 21 6.6V15.4C21 15.6917 20.8836 15.9715 20.6763 16.1778C20.469 16.3841 20.1879 16.5 19.8947 16.5L16.3358 16.5011C15.9081 17.0621 15.3886 17.5571 14.7884 17.9641L8.8421 22L2.89579 17.9652C2.00331 17.3596 1.27299 16.5462 0.768313 15.5957C0.263636 14.6452 -0.000111878 13.5864 3.56003e-08 12.5114V3.5585C0.000133302 3.32414 0.0754747 3.09594 0.215042 2.90717C0.35461 2.71841 0.551108 2.57894 0.775895 2.5091L8.8421 0ZM8.8421 2.3034L2.21053 4.367V12.5114C2.21037 13.1848 2.36554 13.8493 2.66409 14.4537C2.96263 15.0581 3.39659 15.5862 3.93253 15.9973L4.14142 16.1469L8.8421 19.338L13.0222 16.5H7.73684C7.44371 16.5 7.16258 16.3841 6.9553 16.1778C6.74803 15.9715 6.63158 15.6917 6.63158 15.4V6.6C6.63158 6.30826 6.74803 6.02847 6.9553 5.82218C7.16258 5.61589 7.44371 5.5 7.73684 5.5H15.4737V4.367L8.8421 2.3034ZM8.8421 11V14.3H18.7895V11H8.8421ZM8.8421 8.8H18.7895V7.7H8.8421V8.8Z" fill={colors[color as keyof {}]} />
</svg>

export const safe = (size:number=20, color:string="white"):ReactNode => <svg width={size} height={size / 0.86} viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 0L18.1735 1.826C18.6559 1.928 19 2.333 19 2.802V12.789C19 14.795 17.9413 16.669 16.1796 17.781L9.5 22L2.82044 17.781C1.05767 16.668 0 14.795 0 12.79V2.802C0 2.333 0.344111 1.928 0.8265 1.826L9.5 0ZM9.5 2.049L2.11111 3.604V12.789C2.11111 14.126 2.81622 15.375 3.99106 16.117L9.5 19.597L15.0089 16.117C16.1838 15.375 16.8889 14.127 16.8889 12.79V3.604L9.5 2.05V2.049ZM14.1993 7.222L15.6929 8.636L8.97539 15L4.49667 10.757L5.98922 9.343L8.97433 12.171L14.1993 7.221V7.222Z" fill={colors[color as keyof {}]} />
</svg>

export const star = (size:number=20, color:string="white"):ReactNode => <svg width={size} height={size} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.57445 14.5L3.69645 18.09L5.29445 11.39L0.0644531 6.91L6.92945 6.36L9.57445 0L12.2195 6.36L19.0855 6.91L13.8545 11.39L15.4525 18.09L9.57445 14.5Z" fill={colors[color as keyof {}]} />
</svg>

export const arrow = (size:number=20, color:string="white"):ReactNode => <svg width={size} height={size/3.5} viewBox="0 0 21 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.541 2.6143L17.4966 0.545384L18.0355 0L21 3L18.0355 6L17.4966 5.45462L19.541 3.3857H0V2.6143H19.541Z" fill={colors[color as keyof {}]}/>
</svg>
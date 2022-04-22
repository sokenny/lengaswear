import { NextPageAugmented } from 'types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import styles from '../../styles/Relojes.module.scss'

const Reloj:React.FC<{reloj: string}> = ({reloj}) => {
    console.log('Props: ', reloj)
    return (
        <div className={styles.Reloj}>
            <h1>Hola papito</h1>
        </div>
    )
}
    
    interface IParams extends ParsedUrlQuery {
    reloj: string
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
          { params: { reloj: 'quemanta' } },
          { params: { reloj: 'tesh' } },
          { params: { reloj: 'jauke' } },
          { params: { reloj: 'mahai' } },
        ],
        fallback: true // false or 'blocking'
      };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { reloj } = context.params as IParams 
    // const props = fetch(`/api/${reloj}`)
    const props = {reloj}
    return { props }
}

export default Reloj;
import React from "react";
import {LoggerFactory} from "reakit/src/utils";
import Container from "reakit/src/container";
import Grid from "reakit/src/grid";
import brunoPhoto from "assets/images/team/bruno.jpg";
import chuckPhoto from "assets/images/team/chuck.jpg";
import macgyverPhoto from "assets/images/team/macgyver.jpg";
import styles from "./styles";

let Logger = new LoggerFactory("landing.home");

/**
 * Main component class.
 */
export default class Component extends React.Component {
    /** React properties **/
    static displayName = "landing.home";
    static defaultProps = {};
    static propTypes = {};

    componentDidMount() {
        let logger = Logger.create("componentDidMount");
        logger.info("enter");
    }

    render() {
        return (
            <div className={styles.home}>
                <div className={styles.mainSection}>
                    <Container>
                        <h1>Sua idéia lá na Nuvem</h1>
                        <h3>Desenvolvemos seu app/sistema com todo o poder da Nuvem</h3>
                    </Container>
                </div>

                <div className={styles.featuresSection}>
                    <Container>
                        <Grid>
                            <Grid.Cell>
                                <div className={styles.featureBox}>
                                    <div className={styles.header}>
                                        <div className={styles.icon}>
                                            <span className="icon-resize"></span>
                                        </div>
                                        <h3 className={styles.title}>Escalabilidade</h3>
                                    </div>
                                    <div className={styles.body}>
                                        Quantas pessoas vão usar seu aplicativo? Talvez 100? Ou talvez 1.000.000? Não importa a quantidade de zeros, nossos sistemas são pensados para crescer junto com a sua necessidade.
                                    </div>
                                </div>
                            </Grid.Cell>

                            <Grid.Cell>
                                <div className={styles.featureBox}>
                                    <div className={styles.header}>
                                        <div className={styles.icon}>
                                            <span className="icon-bug"></span>
                                        </div>
                                        <h3 className={styles.title}>Disponibilidade</h3>
                                    </div>
                                    <div className={styles.body}>
                                        "O sistema está indisponível no momento, tente novamente mais tarde." A Nosebit emprega as mais modernas técnicas de sistemas distribuídos para que seu aplicativo esteja sempre disponível.
                                    </div>
                                </div>
                            </Grid.Cell>

                            <Grid.Cell>
                                <div className={styles.featureBox}>
                                    <div className={styles.header}>
                                        <div className={styles.icon}>
                                            <span className="icon-design"></span>
                                        </div>
                                        <h3 className={styles.title}>Minimalismo</h3>
                                    </div>
                                    <div className={styles.body}>
                                        Acreditamos que um sistema complexo deve ser apresentado ao seu usuário da forma mais simples o possível. Nosso foco é na experiência do usuário ao utilizar o sistema. Experiência é tudo!
                                    </div>
                                </div>
                            </Grid.Cell>
                        </Grid>
                    </Container>
                </div>

                <div className={styles.workflowSection}>
                    <Container size="sm">
                        <div className={styles.content}>
                            <h3 className={styles.title}>Nosso fluxo de trabalho é assim :</h3>
                            <ul>
                                <li>
                                    <div className={styles.icon}><span className="icon-circled-one"></span></div>
                                    <div>Primeiro vamos conversar para entender a necessidade de seu aplicativo.</div>
                                </li>
                                <li>
                                    <div className={styles.icon}><span className="icon-circled-two"></span></div>
                                    <div>Em seguida vamos elaborar <i>sketches</i> (desenhos simplificados) que vão representar as telas do seu aplicativo e vamos discutir o fluxo de atividades do seu usuário com base nessas telas.</div>
                                </li>
                                <li>
                                    <div className={styles.icon}><span className="icon-circled-three"></span></div>
                                    <div>Vamos aprimorar os <i>sketches</i> para ficarem bem mais parecidos com o que seu usuário vai interagir. Nesse momento faremos ajustes finos no design e iremos repassar o fluxo de atividades do usuário.</div>
                                </li>
                                <li>
                                    <div className={styles.icon}><span className="icon-circled-four"></span></div>
                                    <div>Se tudo estiver de acordo iremos elaborar um orçamento com base nas telas trabalhadas, incluindo o custo de desenvolvimento e manutenção mensal do sistema (como pagamento de servidores, por exemplo).</div>
                                </li>
                            </ul>
                        </div>
                    </Container>
                </div>

                <div className={styles.aboutSection}>
                    <Container size="md">
                        <h3 className={styles.title}>Quem Somos Nós?</h3>

                        <Grid>
                            <Grid.Cell>
                                <div className={styles.teamMember} style={{backgroundImage: `url(${brunoPhoto})`}}>
                                    <div className={styles.overlay}></div>
                                    <div className={styles.infoBox}>
                                        <div className={styles.name}>Bruno Fonseca</div>
                                        <div className={styles.position}>CTO</div>
                                    </div>
                                </div>
                            </Grid.Cell>
                            <Grid.Cell>
                                <div className={styles.teamMember} style={{backgroundImage: `url(${chuckPhoto})`}}>
                                    <div className={styles.overlay}></div>
                                    <div className={styles.infoBox}>
                                        <div className={styles.name}>Chuck Norris</div>
                                        <div className={styles.position}>Call To Action</div>
                                    </div>
                                </div>
                            </Grid.Cell>
                            <Grid.Cell>
                                <div className={styles.teamMember} style={{backgroundImage: `url(${macgyverPhoto})`}}>
                                    <div className={styles.overlay}></div>
                                    <div className={styles.infoBox}>
                                        <div className={styles.name}>MacGyver</div>
                                        <div className={styles.position}>Call To Action</div>
                                    </div>
                                </div>
                            </Grid.Cell>
                        </Grid>
                    </Container>
                </div>

                <div className={styles.footer}>
                    <Container>
                        <div className={styles.content}>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

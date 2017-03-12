import React from "react";
import mixpanel from "mixpanel";
import classNames from "classnames";
import lodash from "lodash";
import {LoggerFactory,Redux} from "reakit/lib/utils";
import Container from "reakit/lib/container";
import Grid from "reakit/lib/grid";
import Form from "reakit/lib/form";
import Field from "reakit/lib/field";
import Text from "reakit/lib/text";
import Button from "reakit/lib/button";
import Toaster from "reakit/lib/toaster";
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

    state = {};

    componentDidMount() {
        let logger = Logger.create("componentDidMount");
        logger.info("enter");

        mixpanel.track("Page Open", {
            location: lodash.get(this.props, "location.pathname")
        });

        Form.registerValidator({
            name: "phone",
            validate: (value) => {
                if(!value) {return true;}

                return (/[0-9]+/).test(value);
            }
        });
    }

    onFormSubmit(data) {
        this.setState({formLoading: true});


        return new Promise((resolve) => {
            // Send to mixpanel
            mixpanel.track("Contact Submit", data, () => {
                this.setState({formLoading: false});

                    // Test toaster
                Redux.shared.store.dispatch(
                    Toaster.actions.push("info", "Formulário enviado com sucesso")
                );

                resolve({name: "", email: "", description: ""});
            });
        });
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

                <div className={styles.formSection}>
                    <Container size="sm">
                        <h3 className={styles.title}>Vamos conversar sobre seu problema?</h3>

                        <Form onSubmit={this.onFormSubmit}
                            loading={this.state.formLoading}>
                            <Field.Section>
                                <Text scale={0.8}>seu nome <span className={classNames(["icon-asterisk2", styles.asterisk])}></span></Text>
                                <Field.Text scale={1.5} name="name" validators="$required"/>
                                <Field.Error
                                    for="name" 
                                    validator="$required"
                                    message="esse campo é obrigatório"/>
                            </Field.Section>

                            <Field.Section>
                                <Text scale={0.8}>seu email <span className={classNames(["icon-asterisk2", styles.asterisk])}></span></Text>
                                <Field.Text scale={1.5} name="email" validators="$required|$email"/>
                                <Field.Error
                                    for="email" 
                                    validator="$required"
                                    message="esse campo é obrigatório"/>
                                <Field.Error
                                    for="email" 
                                    validator="$email"
                                    message="insira um email válido"/>
                            </Field.Section>

                            <Field.Section>
                                <Text scale={0.8}>seu telefone</Text>
                                <Field.Text scale={1.5} name="phone" validators="phone"/>
                                <Field.Error
                                    for="phone" 
                                    validator="phone"
                                    message="apenas números são permitidos"/>
                            </Field.Section>

                            <Field.Section>
                                <Text scale={0.8}>descreva sua idéia <span className={classNames(["icon-asterisk2", styles.asterisk])}></span></Text>
                                <Field.Text scale={1.5} name="description" validators="$required"/>
                                <Field.Error
                                    for="description" 
                                    validator="$required"
                                    message="esse campo é obrigatório"/>
                            </Field.Section>

                            <Field.Section>
                                <Button type="submit" scale={1.5}>
                                    Enviar
                                </Button>
                            </Field.Section>
                        </Form>
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
                                        <div className={styles.position}>CTA</div>
                                    </div>
                                </div>
                            </Grid.Cell>
                            <Grid.Cell>
                                <div className={styles.teamMember} style={{backgroundImage: `url(${macgyverPhoto})`}}>
                                    <div className={styles.overlay}></div>
                                    <div className={styles.infoBox}>
                                        <div className={styles.name}>MacGyver</div>
                                        <div className={styles.position}>CTA</div>
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

import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyTerms() {
    return (
        <section className="relative flex flex-col items-center">
            <ScrollArea className="max-w-4xl w-full flex flex-col items-center max-h-screen p-4 pt-16 text-grey-800">
                <div className="flex flex-col">
                    <Label className="text-3xl text-purple-700 font-bold">
                        Termos de serviço
                    </Label>
                    <span className="mt-3 text-[16px] text-grey-800">Última atualização em 11 de julho de 2024.</span>
                </div>
                <p className="mb-4">
                    Olá, somos a Cogniia! Uma empresa dedicada a criar e oferecer soluções para que todas as pessoas possam fazer
                    uso de uma Plataforma com inteligência artificial para intervenção psicológica.
                </p>

                <p className="mb-4">
                    E para a melhor compreensão e experiência de todos, elaboramos este documento para deixar claro os compromissos
                    e direitos dos usuários durante qualquer interação com a nossa Plataforma Cogniia.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-purple-700">AQUI ESTÃO OS TERMOS E CONDIÇÕES GERAIS DE USO DA PLATAFORMA</h2>

                <p className="mb-4">
                    Ao se cadastrar e utilizar nossa Plataforma, o interessado declara sua concordância com estes Termos e Condições.
                    Portanto, leia atentamente.
                </p>

                <p className="mb-4">
                    Deixaremos este documento sempre público e com fácil acesso em nosso site e através da própria Plataforma.
                </p>

                <p className="mb-4">
                    A Plataforma Cogniia foi desenvolvida para realizar a intervenção terapêutica em casos de ansiedade. Portanto,
                    caso você não apresente qualquer sinal de estar sofrendo de ansiedade ou ainda, caso tenha qualquer dúvida ou
                    discordância com este documento, NÃO SIGA COM O ACESSO À PLATAFORMA.
                </p>

                <p className="mb-4">
                    Estamos à disposição para todos os esclarecimentos que os interessados precisarem no contato@cogniia.com.br
                </p>

                <p className="mb-4">
                    E para a melhor leitura, deixamos aqui algumas definições importantes:
                </p>

                <ul className="list-disc pl-8 mb-4">
                    <li className="mb-2">
                        <strong>Cogniia:</strong> É o nome fantasia de nossa empresa, a qual consiste na MORENO E VICENTE SOLUÇÕES EM SAÚDE MENTAL LTDA., pessoa jurídica de direito privado, inscrita no CNPJ sob n. 54.531.206/0001-77, com sede na Rua Pará, n. 648, unid. 12, Água Verde, CEP 80610-020, Curitiba/PR;
                    </li>
                    <li className="mb-2">
                        <strong>Plataforma Cogniia ou Plataforma:</strong> Para diferenciação neste documento, Plataforma Cogniia se refere ao nosso software disponível para uso público, em que oferecemos ferramentas com tecnologia e inteligência artificial para intervenções terapêuticas para pessoas com quadro de ansiedade. O uso da Plataforma por pessoas com outros quadros clínicos que não seja de ansiedade pode não aproveitar dos benefícios da Plataforma, razão pela qual, ao acessá-la, solicitamos que os Usuários declarem estarem com quadro clínico de ansiedade. Fazemos isso para garantir a segurança e saúde mental dos nossos Usuários;
                    </li>
                    <li className="mb-2">
                        <strong>Usuário:</strong> Toda pessoa natural que se cadastra na Plataforma Cogniia, fornecendo os dados solicitados para tanto, e deseja acessar as funcionalidades lá disponíveis;
                    </li>
                    <li className="mb-2">
                        <strong>Conteúdo:</strong> Todo material disponibilizado na Plataforma, o qual não é objeto de cessão aos Usuários ou a terceiros, mas mantido de total e exclusiva propriedade da própria Cogniia.
                    </li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-4 text-purple-700">1. DO FUNCIONAMENTO DA PLATAFORMA:</h3>

                <p className="mb-4">
                    1.1. Para o Usuário se cadastrar na Plataforma, deverá atender todas as exigências nela descritas, fornecendo as informações requeridas de forma precisa e verdadeira. O Usuário declara e assume o compromisso de atualizar os dados inseridos em seu cadastro (Dados Pessoais) sempre que for necessário ou solicitado pela Plataforma.
                </p>

                <p className="mb-4">
                    1.2. Os serviços da Plataforma estão disponíveis apenas para as pessoas físicas que tenham capacidade legal. É proibido o cadastro de Usuários que não tenham capacidade civil (com relação a pessoas físicas), como os menores de 18 (dezoito) anos, bem como pessoas que tenham sido suspensas, temporária ou definitivamente da Plataforma.
                </p>

                <p className="mb-4">
                    1.3. É reservado a Plataforma o direito de recusar qualquer solicitação de cadastro ou de suspender um cadastro previamente aceito que esteja em desacordo com esses Termos e Condições Gerais de Uso ou com a Política de Privacidade.
                </p>

                <p className="mb-4">
                    1.4. Nós poderemos realizar as buscas que julgar necessárias para apurar dados incorretos ou inverídicos, solicitar dados adicionais e documentos que considere pertinentes para conferência dos Dados Pessoais cadastrados e, ainda, recorrer à base de dados públicas ou privadas, podendo o Usuário editá-las caso entenda que tais dados não estejam atualizados.
                </p>

                <p className="mb-4">
                    1.5. Ao completar o preenchimento de seu cadastro, o Usuário concorda em receber mensagens na sua caixa de correspondência eletrônica no e-mail e outros meios disponíveis, através das ferramentas específicas a respeito do uso da Plataforma.
                </p>

                <p className="mb-4">
                    1.6. O Usuário será o único responsável por seu login e senha e responderá por todos os atos praticados em sua conta de acesso. Portanto, é dever do Usuário zelar pela guarda e confidencialidade de sua senha. Caso o usuário deseje trocar sua senha, deverá seguir as orientações descritas na Plataforma.
                </p>

                <p className="mb-4">
                    1.7. O Usuário se compromete a comunicar imediatamente a respeito de qualquer uso não autorizado de sua conta, bem como em caso de acesso não autorizado por terceiros. O Usuário será o único responsável pelas ações efetuadas em sua conta, uma vez que o acesso só será possível mediante a inclusão da senha, que deverá ser de conhecimento e propriedade exclusiva do Usuário.
                </p>

                <p className="mb-4">
                    1.8. Os serviços fornecidos através da nossa Plataforma envolvem a utilização de tecnologia de inteligência artificial para tornar a interação do Usuário com a Plataforma mais adequada às suas necessidades.
                </p>

                <p className="mb-4">
                    1.9. Para aprimorar os sistemas que compõem a nossa Plataforma, podemos utilizar o histórico de intervenções já realizadas na própria Plataforma ou fornecidas por terceiros. Tais históricos são utilizados única e tão somente para fins de melhoria do software, mas fique tranquilo(a)! Todos os históricos e relatórios técnicos são utilizados de maneira anonimizados, isto é, sem fazer referências a nomes ou dados das pessoas correspondentes.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4 text-purple-700">2. OBRIGAÇÕES E RESPONSABILIDADE DO USUÁRIO:</h3>

                <p className="mb-4">
                    2.1. Para utilização da Plataforma, o Usuário deverá fornecer todos os dados que lhe forem solicitados, de maneira verídica, sendo ele o único responsável, civil e criminalmente, pela utilização de dados incorretos ou pertencentes a terceiros, sem prejuízo da respectiva suspensão ou cancelamento de acesso à Plataforma.
                </p>

                <p className="mb-4">
                    2.1.1. O uso da Plataforma é de responsabilidade exclusiva do Usuário. Dessa maneira, é absolutamente vedado qualquer uso ilícito, ilegal ou que provoque danos à Plataforma, aos demais usuários ou a terceiros. Ocorrendo tais danos, será de inteira e exclusiva responsabilidade do Usuário o ressarcimento devido.
                </p>

                <p className="mb-4">
                    2.1.2. O Usuário deverá, ainda, respeitar as diretrizes de tratamento de dados pessoais a que eventualmente tenha acesso em conformidade com a nossa Política de Privacidade.
                </p>

                <p className="mb-4">
                    2.2. Caso seja verificado a utilização indevida, ilegal, irregular, ou, ainda, contrária às disposições deste documento, poderá ocorrer a suspensão ou ao cancelamento imediato do acesso do Usuário.
                </p>

                <p className="mb-4">
                    2.3. Para o uso da Plataforma, o Usuário precisa dispor de aparelhos compatíveis com as funcionalidades oferecidas, bem como providenciar a conexão com a internet em velocidade adequada, certo de que eventuais falhas ou incompatibilidades não são de nossa responsabilidade.
                </p>

                <div className="mb-4">
                    2.4. É vedado ao Usuário acessar, utilizar ou manipular qualquer código ou funcionalidade que não esteja diretamente disponibilizado pela Plataforma.
                    <h3 className="text-xl font-bold mt-8 mb-4 text-purple-700">3. DA PROPRIEDADE INTELECTUAL:</h3>

                    <p className="mb-4">
                        3.1. O conteúdo da Plataforma é de propriedade exclusiva da Cogniia, não podendo o Usuário reproduzi-lo, copiá-lo, divulgá-lo, distribuí-lo ou de qualquer forma utilizá-lo sem a prévia e expressa autorização da Cogniia.
                    </p>

                    <p className="mb-4">
                        3.2. A Plataforma, incluindo, mas não se limitando a, software, código-fonte, layout, design e conteúdos são protegidos por direitos autorais e outros direitos de propriedade intelectual, sendo vedado o uso sem a devida autorização.
                    </p>

                    <p className="mb-4">
                        3.3. O Usuário concorda em não fazer engenharia reversa, descompilar ou tentar de qualquer forma descobrir o código fonte do software da Plataforma.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4 text-purple-700">4. DAS MODIFICAÇÕES:</h3>

                    <p className="mb-4">
                        4.1. A Cogniia poderá, a qualquer momento e sem necessidade de aviso prévio, alterar os Termos e Condições Gerais de Uso da Plataforma, bem como suas funcionalidades e o seu layout. Tais alterações entrarão em vigor imediatamente após a sua publicação no site da Cogniia.
                    </p>

                    <p className="mb-4">
                        4.2. O Usuário é responsável por revisar periodicamente os Termos e Condições Gerais de Uso para manter-se informado sobre quaisquer mudanças. O uso contínuo da Plataforma após tais modificações constitui aceitação das alterações realizadas.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4 text-purple-700">5. DA RESPONSABILIDADE:</h3>

                    <p className="mb-4">
                        5.1. A Cogniia não será responsável por quaisquer danos diretos, indiretos, especiais ou consequenciais resultantes do uso ou incapacidade de uso da Plataforma, mesmo que tais danos tenham sido previstos ou fossem previsíveis.
                    </p>

                    <p className="mb-4">
                        5.2. Em hipótese alguma, a Cogniia será responsável por danos causados por vírus ou outros elementos prejudiciais que possam infectar o equipamento do Usuário.
                    </p>

                    <p className="mb-4">
                        5.3. A Cogniia não garante que a Plataforma funcionará sem interrupções ou erros. No entanto, envidará esforços para corrigir quaisquer falhas, interrupções ou erros que possam ocorrer.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4 text-purple-700">6. DO CANCELAMENTO:</h3>

                    <p className="mb-4">
                        6.1. O Usuário pode solicitar o cancelamento do seu cadastro a qualquer momento, mediante o envio de solicitação para o e-mail contato@cogniia.com.br.
                    </p>

                    <p className="mb-4">
                        6.2. A Cogniia se reserva o direito de cancelar o acesso do Usuário, a qualquer momento e sem aviso prévio, caso haja violação de qualquer cláusula destes Termos e Condições Gerais de Uso.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4 text-purple-700">7. DISPOSIÇÕES GERAIS:</h3>

                    <p className="mb-4">
                        7.1. Estes Termos e Condições Gerais de Uso são regidos pela legislação brasileira, sendo que quaisquer litígios serão resolvidos no foro da cidade de Curitiba, estado do Paraná.
                    </p>

                    <p className="mb-4">
                        7.2. A nulidade ou inexigibilidade de qualquer disposição destes Termos e Condições Gerais de Uso não afetará a validade e exequibilidade das demais disposições.
                    </p>

                    <p className="mb-4">
                        7.3. O não exercício ou a demora no exercício de qualquer direito ou recurso previsto nestes Termos e Condições Gerais de Uso não constituirá renúncia a tal direito ou recurso.
                    </p>
                </div>
            </ScrollArea>

        </section>
    );
}
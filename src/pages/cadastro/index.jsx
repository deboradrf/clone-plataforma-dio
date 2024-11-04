import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdLock } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { Container, Title, Column, TitleCadastro, SubtitleCadastro, LoginText, Row, Wrapper, TermosUso } from './styles';

const Cadastro = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const response = await api.post('/users', {
                name: formData.name,
                email: formData.email,
                senha: formData.senha
            });
            
            if (response.status === 201) {
                alert('Cadastro realizado com sucesso!');
                navigate('/feed');
                return;
            }

            alert('Erro ao realizar o cadastro. Tente novamente.');
        } catch (e) {
            console.error('Erro ao tentar realizar cadastro:', e);
            alert('Ocorreu um erro ao tentar realizar o cadastro');
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>
                        A plataforma para você aprender com experts, dominar as principais tecnologias
                        e entrar mais rápido nas empresas mais desejadas.
                    </Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleCadastro>Comece agora grátis</TitleCadastro>
                        <SubtitleCadastro>Crie sua conta e make the change._</SubtitleCadastro>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input 
                                placeholder="Nome Completo" 
                                leftIcon={<FaUser />} 
                                name="name" 
                                control={control} 
                                rules={{ required: 'Nome é obrigatório' }} 
                            />

                            <Input 
                                placeholder="E-mail" 
                                leftIcon={<MdEmail />} 
                                name="email" 
                                control={control} 
                                rules={{ required: 'E-mail é obrigatório' }} 
                            />
                            
                            <Input 
                                type="password" 
                                placeholder="Senha" 
                                leftIcon={<MdLock />} 
                                name="senha" 
                                control={control} 
                                rules={{ required: 'Senha é obrigatória' }} 
                            />
                            
                            <Button title="Criar minha conta" variant="secondary" type="submit" />
                        </form>
                        <Row>
                            <TermosUso>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</TermosUso>
                        </Row>
                        <Row>
                            <LoginText>Já tenho conta. <span>Fazer Login</span></LoginText>
                        </Row>
                    </Wrapper>
                </Column>
            </Container>
        </>
    );
}

export { Cadastro };
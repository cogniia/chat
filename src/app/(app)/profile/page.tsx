"use client";
import { AlertDialogComponent } from "@/components/alertComponent";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { logout } from "@/services/authService";
import { deleteUserService } from "@/services/userService";
import { useAuthStore } from "@/zustand-store/authStore";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
    const { user } = useAuthStore();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [showDialogIcon, setShowDialogIcon] = useState<boolean>(false);
    const [errorDialog, setErrorDialog] = useState<boolean | undefined>(
        undefined
    );
    const [titleDialog, setTitleDialog] = useState<string>(
        "Tem certeza de que deseja excluir sua conta?"
    );
    const [descriptionDialog, setDescriptionDialog] = useState<string>(
        "Todos os seus dados serão completamente apagados de nossa plataforma."
    );
    const [cancelButtonDialog, setCancelButtonDialog] =
        useState<string>("Cancelar");
    const [actionButtonDialog, setActionButtonDialog] = useState<
        string | undefined
    >("Excluir conta");

    function changePasswrod() {
        router.push("/changepassword");
    }

    const handleAction = async () => {
        setIsLoading(true);
        await deleteUserService(user?.id)
            .then(() => {
                setTitleDialog("Conta excluída com sucesso");
                setDescriptionDialog(
                    "Seus dados e sua conta foram todos apagados de nossa plataforma."
                );
                setCancelButtonDialog("Fechar janela");
                setErrorDialog(false);
                setShowDialogIcon(true);
                setShowDialog(true);
                logout();
            })
            .catch((e) => {
                setTitleDialog("Ocorreu um erro durante a exclusão da conta");
                setDescriptionDialog(
                    "Houve um problema de comunicação em nosso servidor e não foi possível excluir sua conta no momento, Por favor, tente novamente mais tarde"
                );
                setCancelButtonDialog("Voltar para seu perfil");
                setErrorDialog(true);
                setShowDialogIcon(true);
                setShowDialog(true);
            })
            .finally(() => {
                setActionButtonDialog(undefined);
                setIsLoading(false);
                router.refresh()
            });
    };

    const handleCancel = () => {
        setShowDialog(false);
        setTitleDialog("Tem certeza de que deseja excluir sua conta?");
        setDescriptionDialog(
            "Todos os seus dados serão completamente apagados de nossa plataforma."
        );
        setCancelButtonDialog("Cancelar");
        setActionButtonDialog("Excluir conta");
        setErrorDialog(undefined);
        setShowDialogIcon(false);
    };

    return (
        <section className="relative h-full flex flex-col items-center p-4 pt-16">
            <AlertDialogComponent
                icon={showDialogIcon}
                show={showDialog}
                title={titleDialog}
                description={descriptionDialog}
                cancelText={cancelButtonDialog}
                actionText={actionButtonDialog}
                onAction={handleAction}
                onCancel={handleCancel}
                actionError={true}
                error={errorDialog}
                isLoading={isLoading}
            />
            <div className="max-w-4xl w-full flex flex-col">
                <Label className="text-3xl text-purple-700 font-bold">Seu Perfil</Label>
                <div className="mt-24 flex relative flex-col">
                    <Label className="text-xl text-grey-800 font-semibold mb-8">
                        Dados Cadastrados
                    </Label>
                    <div className="flex flex-row flex-wrap justify-between gap-6">
                        <div className="grid gap-4">
                            <Label className="text-grey-800 text-[16px]">Nome</Label>
                            <Label className="text-purple-700 text-xl font-semibold">
                                {user?.name}
                            </Label>
                        </div>
                        <div className="grid gap-4">
                            <Label className="text-grey-800 text-[16px]">E-mail</Label>
                            <Label className="text-purple-700 text-xl font-semibold">
                                {user?.email}
                            </Label>
                        </div>
                    </div>
                    <div className="grid gap-4 max-w-sm mt-14">
                        <Button
                            className="w-fit mt-5"
                            onClick={changePasswrod}
                            label="Alterar senha"
                        />
                    </div>
                    <div className="grid gap-1 max-w-sm mt-14">
                        <Label className="text-xl text-grey-800 font-semibold">
                            Outras opções
                        </Label>
                        <Button
                            className="w-fit -ml-7 gap-2 text-danger-300 hover:text-danger-300"
                            variant="outline"
                            onClick={() => setShowDialog(true)}
                            label="Excluir conta"
                        >
                            <Trash2 />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

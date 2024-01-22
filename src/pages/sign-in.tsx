import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { AuthActions } from "../store/auth.slice";
import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SIGN_IN_RESTORER } from "../graphql/account/queries/sign-in-restorer.query";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { SignInRestorer } from "../graphql/account/queries/__generated__/SignInRestorer";
import { storeActions } from "../store/store.slice";
import { GET_ORGANIZATION } from "../graphql/organization/queries/get-organization.query";
import { GetOrganization } from "../graphql/organization/queries/__generated__/GetOrganization";
import { organizationActions } from "../store/organization.slice";

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [bannerError, setBannerError] = useState(false);

  const handlePasswordVisibility = useCallback(() => {
    setPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible]);

  const [getOrganization] = useLazyQuery<GetOrganization>(GET_ORGANIZATION, {
    onCompleted: async (response) => {
      dispatch(organizationActions.setOrganization(response.getOrganization));
      dispatch(storeActions.setStore(response.getOrganization.stores?.at(0)));
    },
  });

  const [signIn, { loading, error, data }] = useLazyQuery<SignInRestorer>(
    SIGN_IN_RESTORER,
    {
      onCompleted: async (response) => {
        setBannerError(false);
        dispatch(
          AuthActions.login({
            organizationId: response.signInRestorer.organizationId,
            storeIds: response.signInRestorer.storeIds,
            email: response.signInRestorer.email,
            firstname: response.signInRestorer.firstname,
            lastname: response.signInRestorer.lastname,
            accessToken: response.signInRestorer.accessToken,
          })
        );
        await getOrganization({
          variables: { organizationId: response.signInRestorer.organizationId },
        });
        navigate("/orders");
      },
      onError: (error) => {
        setBannerError(true);
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInSubmit = useCallback(async (value: any) => {
    await signIn({
      variables: {
        email: value.email,
        password: value.password,
      },
    });
  }, []);

  return (
    <div className="flex flex-row justify-center items-center">
      <Card className="w-96 mt-80">
        <CardBody>
          <form className="space-y-2" onSubmit={handleSubmit(signInSubmit)}>
            <Input
              type="email"
              label="Email"
              isRequired
              {...register("email")}
              validationState={errors.email ? "invalid" : "valid"}
              errorMessage={errors.email ? "L'email est requis" : null}
            />

            <Input
              type={isPasswordVisible ? "text" : "password"}
              label="mot de passe"
              isRequired
              {...register("password")}
              validationState={errors.password ? "invalid" : "valid"}
              errorMessage={
                errors.password ? "Le mot de passe est requis" : null
              }
              endContent={
                isPasswordVisible ? (
                  <Icon
                    icon="gridicons:not-visible"
                    className="cursor-pointer"
                    onClick={handlePasswordVisibility}
                  />
                ) : (
                  <Icon
                    icon="gridicons:visible"
                    className="cursor-pointer"
                    onClick={handlePasswordVisibility}
                  />
                )
              }
            />
            {bannerError && (
              <div className="p-2 bg-red-300 rounded text-sm">
                <div className="flex flex-row items-center space-x-2">
                  <Icon icon="material-symbols:error" />
                  <div>Identifiants incorrects</div>
                </div>
              </div>
            )}
            <Button type="submit" isLoading={loading}>
              Se connecter
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default SignInPage;

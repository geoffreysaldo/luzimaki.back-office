import { Button, Link, Listbox, ListboxItem, Navbar, NavbarBrand, NavbarContent, NavbarItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../store/auth.slice";
import { useNavigate } from "react-router-dom";
import logoLuzumaki from "../assets/logo-luzumaki.png";
import { Icon } from "@iconify/react";
import { StoreFragment } from "../graphql/store/fragments/__generated__/StoreFragment";
import { useCallback, useMemo, useState } from "react";
import { storeActions } from "../store/store.slice";

function Header() {
  const organizationState = useSelector((state) => (state as any).organization);
  const storeState = useSelector((state) => (state as any).store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedKeys, setSelectedKeys] = useState(new Set([storeState.id]));

  const handleSelectionKeys = useCallback(
    (v: any) => {
      const value = Array.from(v);
      setSelectedKeys(new Set([value.at(0)]));
      dispatch(storeActions.setStore(organizationState.stores.find((s: StoreFragment) => s.id === value.at(0))));
    },
    [selectedKeys, organizationState]
  );

  return (
    <Navbar className="bg-slate-800" maxWidth="full">
      <NavbarBrand className="space-x-2">
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button size="sm" isIconOnly color="primary">
              <Icon icon="fa-solid:store" color="white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Listbox
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={handleSelectionKeys}
            >
              {organizationState.stores?.map((s: StoreFragment) => (
                <ListboxItem key={s.id}>{s.name}</ListboxItem>
              ))}
            </Listbox>
          </PopoverContent>
        </Popover>

        <img className="w-40" src={logoLuzumaki} />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center"></NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            onClick={() => {
              dispatch(AuthActions.logout());
              navigate("/sign-in");
            }}
          >
            Se déconnecter
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;

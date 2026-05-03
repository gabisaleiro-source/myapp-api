const TipoPublicidade = require('../models/TipoPublicidade');
const tipoPublicidadePolicy = require('../policies/tipoPublicidadePolicy');
const tipoPublicidadeResource = require('../resources/TipoPublicidadeResource');

exports.index = async (req, res) => {
    try {
        if (!tipoPublicidadePolicy.viewAny(req.user)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        const tipos = await TipoPublicidade.find().populate('processos');

        return res.status(200).json(tipos.map(tipoPublicidadeResource));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao listar tipos de publicidade' });
    }
};

exports.show = async (req, res) => {
    try {
        if (!tipoPublicidadePolicy.view(req.user, req.tipoPublicidade)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        return res.status(200).json(tipoPublicidadeResource(req.tipoPublicidade));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao mostrar tipo de publicidade' });
    }
};

exports.store = async (req, res) => {
    try {
        if (!tipoPublicidadePolicy.create(req.user)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        const tipoPublicidade = await TipoPublicidade.create(req.body);

        return res.status(201).json(tipoPublicidadeResource(tipoPublicidade));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar tipo de publicidade' });
    }
};

exports.update = async (req, res) => {
    try {
        if (!tipoPublicidadePolicy.update(req.user, req.tipoPublicidade)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        const updatedTipo = await TipoPublicidade.findByIdAndUpdate(
            req.tipoPublicidade._id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('processos');

        return res.status(200).json(tipoPublicidadeResource(updatedTipo));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao atualizar tipo de publicidade' });
    }
};

exports.destroy = async (req, res) => {
    try {
        if (!tipoPublicidadePolicy.delete(req.user, req.tipoPublicidade)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        await TipoPublicidade.findByIdAndDelete(req.tipoPublicidade._id);

        return res.status(200).json({ message: 'Tipo de publicidade removido com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao remover tipo de publicidade' });
    }
};